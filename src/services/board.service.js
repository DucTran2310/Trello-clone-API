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

    const transformBoard = cloneDeep(board)
    //Filter những column có destroy:false thì mới cho hiển thị ra
    transformBoard.columns = transformBoard.columns.filter(column => !column._destroy)
    //Add card to each column
    transformBoard.columns.forEach(column => {
      column.cards = transformBoard.cards.filter(c => c.columnId.toString() === column._id.toString())
    })

    //Sort columns by columnOrder, sort cards by cardOrder -> frontend
    //Remove Card Data From Board Collection
    delete transformBoard.cards

    //console.log(board)

    return transformBoard
  } catch (error) {
    //console.log(error)
    throw new Error(error)
  }
}

const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
      updatedAt: Date.now()
    }
    //fix lỗi call api
    if (updateData._id) delete updateData._id
    if (updateData.columns) delete updateData.columns

    const updatedBoard = await BoardModel.update(id, updateData)

    return updatedBoard
  } catch (error) {
    throw new Error(error)
  }
}

export const BoardService = {
  createNew,
  getFullBoard,
  update
}

