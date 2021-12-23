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

export const CardModel = {
  createNew,
  cardCollectionName
}
