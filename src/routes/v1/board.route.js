import express from 'express'
import { BoardController } from '*/controllers/board.controller'
import { BoardValidation } from '*/validations/board.validation'

const router = express.Router()

// GET list of board
router.route('/').post(BoardValidation.createNew, BoardController.createNew)

// GET list of board
router.route('/:id')
  .get(BoardController.getFullBoard)
  .put(BoardValidation.update, BoardController.update)


export const boardRoutes = router
