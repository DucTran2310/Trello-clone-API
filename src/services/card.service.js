import { CardModel } from '*/models/card.model'
import { ColumnModel } from '*/models/column.model'

const createNew = async (data) => {
  try {
    const newCard = await CardModel.createNew(data)
    //update cardOrder Array in column Collection
    const columnId = newCard.columnId.toString()
    const newCardId = newCard._id.toString()
    await ColumnModel.pushCardOrder(columnId, newCardId)
    return newCard
  } catch (error) {
    console.log(error)
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

    const updatedCard = await CardModel.update(id, updateData)

    return updatedCard
  } catch (error) {
    throw new Error(error)
  }
}

export const CardService = { createNew, update }
