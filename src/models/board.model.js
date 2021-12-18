import Joi from 'joi'
import { getDB } from '*/config/mongodb'

// Define Board Collection
const boardCollectionName = 'Boards'

const boardCollectionShema = Joi.object({
  title: Joi.string().required().min(3).max(20),
  // columnOrder la 1 array, moi item ben trong no co kieu du lieu gi
  columnOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(Date.now),
  _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
  // AbortEarly se chay day du va tra ve day du loi
  return await boardCollectionShema.validateAsync(data, { abortEarly: false })
}

const creatNew = async (data) => {
  try {
    const value = await validateSchema(data)
    const result = await getDB().collection(boardCollectionName).insertOne(value)
    //console.log(result)
    return result.ops[0]
  } catch (error) {
    console.log(error)
  }
}

export const BoardModel = { creatNew }
