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
    const value = await validateSchema(data)
    //Clone lại value và ghi đè id từ string -> ObjectId
    // const valueInsert = {
    //   ...valueValidate,
    //   boardId: ObjectId(valueValidate.boardId)
    // }
    const result = await getDB().collection(columnCollectionName).insertOne(value)
    console.log(result)
    return await getDB().collection(columnCollectionName).findOne(result.insertedId)
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

const update = async (id, data) => {
  try {
    const result = await getDB().collection(columnCollectionName).findOneAndUpdate(
      // tìm phần tử theo id
      { _id: ObjectId(id) }, //tìm đến id của column cần update
      { $set: data }, //data update từ service truyền qua
      { returnDocument: 'after' } //trả về bản ghi đã update, true -> bản ghi chưa update
    )
    console.log(result)
    return result.value
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export const ColumnModel = {
  createNew,
  update
}
