import Joi from 'joi'
import { getDB } from '*/config/mongodb'

// Define Column Collection
const columnCollectionName = 'columns'

const columnCollectionShema = Joi.object({
  boardId: Joi.string().required(),
  title: Joi.string().required().min(3).max(20),
  // columnOrder la 1 array, moi item ben trong no co kieu du lieu gi
  cardOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(Date.now),
  _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
  // AbortEarly se chay day du va tra ve day du loi
  return await columnCollectionShema.validateAsync(data, { abortEarly: false })
}

const creatNew = async (data) => {
  try {
    const value = await validateSchema(data)
    const result = await getDB().collection(columnCollectionName).insertOne(value)
    //console.log(result)
    return result.ops[0]
  } catch (error) {
    console.log(error)
  }
}

export const ColumnModel = { creatNew }
