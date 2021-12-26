import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from '*/config/mongodb'

// Define Card Collection
const cardCollectionName = 'cards'

const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().required().min(3).max(20).trim(),
  // columnOrder la 1 array, moi item ben trong no co kieu du lieu gi
  cover: Joi.string().default(null),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
  // AbortEarly se chay day du va tra ve day du loi
  return await cardCollectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validatedValue = await validateSchema(data)
    //Clone lại value và ghi đè id từ string -> ObjectId
    const valueInsert = {
      ...validatedValue,
      boardId: ObjectId(validatedValue.boardId),
      columnId: ObjectId(validatedValue.columnId)
    }

    const result = await getDB().collection(cardCollectionName).insertOne(valueInsert)
    //console.log(result)
    return await getDB().collection(cardCollectionName).findOne(result.insertedId)
  } catch (error) {
    //console.log(error)
    throw new Error(error)
  }
}

const update = async (id, data) => {
  try {
    const updateData = { ...data }
    //Kiểm tra nếu data đẩy lên server có tồn tại boardId thì convert boardId từ string -> objectID
    if (data.boardId) {
      updateData.boardId = ObjectId(data.boardId)
    }
    if (data.columnId) {
      updateData.columnId = ObjectId(data.columnId)
    }
    const result = await getDB().collection(cardCollectionName).findOneAndUpdate(
      // tìm phần tử theo id
      { _id: ObjectId(id) }, //tìm đến id của board cần update
      { $set: updateData }, //data update từ service truyền qua
      { returnDocument: 'after' } //trả về bản ghi đã update, true -> bản ghi chưa update
    )
    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

/**
 *
 * @param {Array of string card id} ids
 */
const deleteMany = async (ids) => {
  try {
    //Chuyển đổi các phần tử id:string -> id:object trong mảng ids
    const transformIds = ids.map(i => ObjectId(i))
    //Await đến hàm GetDB rồi insert cái value đã validate vào
    const result = await getDB().collection(cardCollectionName).updateMany(
      { _id: { $in: transformIds } }, //Update những _id nào nằm trong mảng ids
      { $set: { _destroy: true } } //Update lại _destroy = true
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}


export const CardModel = {
  cardCollectionName,
  createNew,
  update,
  deleteMany
}
