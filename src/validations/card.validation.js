import Joi from 'joi'
import { HttpStatusCode } from '*/utilities/constants'

const createNew = async (req, res, next) => {
  //console.log(req.query)
  const condition = Joi.object({
    boardId: Joi.string().required(),
    columnId: Joi.string().required(), //Mặc định là string -> ObjectId để truy vấn
    title: Joi.string().required().min(3).max(20).trim()
  })
  try {
    await condition.validateAsync(req.body, { abortEarly: false })
    //Nếu thỏa mãn condition => controller
    next()
  } catch (error) {
    //console.log(error)
    res.status(HttpStatusCode.BAD_REQUEST).json({
      errors: new Error(error).message
    })
  }
}

const update = async (req, res, next) => {
  //console.log(req.query)
  const condition = Joi.object({
    title: Joi.string().min(3).max(20).trim(),
    board: Joi.string(),
    columnId: Joi.string()
  })
  try {
    await condition.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true
    })
    //Nếu thỏa mãn condition => controller
    next()
  } catch (error) {
    //console.log(error)
    res.status(HttpStatusCode.BAD_REQUEST).json({
      errors: new Error(error).message
    })
  }
}

export const CardValidation = { createNew, update }
