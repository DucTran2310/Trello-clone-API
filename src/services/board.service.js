import { BoardModel } from '*/models/board.model'
import { cloneDeep } from 'lodash'

const createNew = async (data) => {
  try {
    const result = await BoardModel.createNew(data)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getFullBoard = async (boardId) => {
  try {
    const board = await BoardModel.getFullBoard(boardId)

    if (!board || !board.columns) {
      throw new Error('Board Not Found!')
    }

    //Add card to each column
    board.columns.forEach(column => {
      column.cards = board.cards.filter(c => c.columnId.toString() === column._id.toString())
    })

    //Sort columns by columnOrder, sort cards by cardOrder -> frontend
    //Remove Card Data From Board Collection
    delete board.cards

    //console.log(board)

    return board
  } catch (error) {
    //console.log(error)
    throw new Error(error)
  }
}

export const BoardService = {
  createNew,
  getFullBoard
}

