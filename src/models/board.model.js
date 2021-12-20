import Joi from 'joi'
import { getDB } from '*/config/mongodb'

// Define Board Collection
const boardCollectionName = 'boards'

const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(20),
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
    console.log(error)
    throw new Error(error)
  }
}

export const BoardModel = { createNew }
