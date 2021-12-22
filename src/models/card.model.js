import Joi from 'joi'
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
    const value = await validateSchema(data)
    const result = await getDB().collection(cardCollectionName).insertOne(value)
    //console.log(result)
    return await getDB().collection(cardCollectionName).findOne(result.insertedId)
  } catch (error) {
    //console.log(error)
    throw new Error(error)
  }
}

export const CardModel = { createNew }
