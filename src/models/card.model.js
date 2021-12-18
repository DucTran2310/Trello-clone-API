import Joi from 'joi'
import { getDB } from '*/config/mongodb'

// Define Card Collection
const cardCollectionName = 'cards'

const cardCollectionShema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().required().min(3).max(20),
  // columnOrder la 1 array, moi item ben trong no co kieu du lieu gi
  cover: Joi.string().default(null),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(Date.now),
  _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
  // AbortEarly se chay day du va tra ve day du loi
  return await cardCollectionShema.validateAsync(data, { abortEarly: false })
}

const creatNew = async (data) => {
  try {
    const value = await validateSchema(data)
    const result = await getDB().collection(cardCollectionName).insertOne(value)
    //console.log(result)
    return result.ops[0]
  } catch (error) {
    console.log(error)
  }
}

export const CardModel = { creatNew }
