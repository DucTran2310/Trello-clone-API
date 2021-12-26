import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from '*/config/mongodb'

// Define Column Collection
const columnCollectionName = 'columns'

const columnCollectionSchema = Joi.object({
  boardId: Joi.string().required(), //Mặc định là string -> ObjectId để truy vấn
  title: Joi.string().required().min(3).max(20).trim(),
  // columnOrder la 1 array, moi item ben trong no co kieu du lieu gi
  cardOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
  // AbortEarly se chay day du va tra ve day du loi
  return await columnCollectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validatedValue = await validateSchema(data)
    //Clone lại value và ghi đè id từ string -> ObjectId
    const valueInsert = {
      ...validatedValue,
      boardId: ObjectId(validatedValue.boardId)
    }

    const result = await getDB().collection(columnCollectionName).insertOne(valueInsert)
    console.log(result)

    return await getDB().collection(columnCollectionName).findOne(result.insertedId)
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

/**
 *
 * @param {string} boardId
 * @param {string} columnId
 */
const pushCardOrder = async (columnId, cardId) => {
  try {
    const result = await getDB().collection(columnCollectionName).findOneAndUpdate(
      { _id: ObjectId(columnId) }, //tìm đến id của column cần update
      { $push: { cardOrder: cardId } }, //push cardId vừa tạo vào CardOrder Array
      { returnDocument: 'after' } //trả về bản ghi đã update, true -> bản ghi chưa update
    )
    return result.value
  } catch (error) {
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
    const result = await getDB().collection(columnCollectionName).findOneAndUpdate(
      // tìm phần tử theo id
      { _id: ObjectId(id) }, //tìm đến id của column cần update
      { $set: updateData }, //data update từ service truyền qua
      { returnDocument: 'after' } //trả về bản ghi đã update, true -> bản ghi chưa update
    )
    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

export const ColumnModel = {
  columnCollectionName,
  createNew,
  pushCardOrder,
  update
}
