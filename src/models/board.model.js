import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from '*/config/mongodb'
import { ColumnModel } from './column.model'
import { CardModel } from './card.model'

// Define Board Collection
const boardCollectionName = 'boards'

const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(20).trim(),
  // columnOrder la 1 array, moi item ben trong no co kieu du lieu gi
  columnOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
  // AbortEarly se chay day du va tra ve day du loi
  return await boardCollectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    //data đã được validate
    const value = await validateSchema(data)
    //Await đến hàm GetDB rồi insert cái value đã validate vào
    const result = await getDB().collection(boardCollectionName).insertOne(value)
    //console.log(result)
    return await getDB().collection(boardCollectionName).findOne(result.insertedId)
  } catch (error) {
    //console.log(error)
    throw new Error(error)
  }
}

/**
 *
 * @param {string} boardId
 * @param {string} columnId
 */

const pushColumnOrder = async (boardId, columnId) => {
  try {
    const result = await getDB().collection(boardCollectionName).findOneAndUpdate(
      { _id: ObjectId(boardId) }, //tìm đến id của board cần update
      { $push: { columnOrder: columnId } }, //push columnId vừa tạo vào columnOrder Array
      { returnDocument: 'after' } //trả về bản ghi đã update, true -> bản ghi chưa update
    )

    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

const getFullBoard = async (boardId) => {
  try {
    //Await đến hàm GetDB rồi insert cái value đã validate vào
    const result = await getDB().collection(boardCollectionName).aggregate([
      {
        //So sánh _id trong db với id truyền vào, lọc _destroy: false->lookup
        $match: {
          _id: ObjectId(boardId),
          _destroy: false
        }
      },
      {
        $lookup: {
          from: ColumnModel.columnCollectionName, //collection name
          localField: '_id', //lấy ra cái _id vừa match được
          foreignField: 'boardId', // Key của collection -> so sánh với localField
          as: 'columns' //Key để hiển thị ra trong json
        }
      },
      {
        $lookup: {
          from: CardModel.cardCollectionName, //collection name
          localField: '_id', //lấy ra cái _id vừa match được
          foreignField: 'boardId', // Key của collection -> so sánh với localField
          as: 'cards' //Key để hiển thị ra trong json
        }
      }
    ]).toArray() //toArray -> để trả về duy nhất mảng không lấy mọi thứ trong mongodb trả về

    //console.log(result)

    return result[0] || {}
  } catch (error) {
    //console.log(error)
    throw new Error(error)
  }
}

export const BoardModel = {
  createNew,
  pushColumnOrder,
  getFullBoard
}
