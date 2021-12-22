import { HttpStatusCode } from '*/utilities/constants'
import { CardService } from '*/services/card.service'

const createNew = async (req, res) => {
  try {
    const result = await CardService.createNew(req.body)
    //console.log(result)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    console.log(error)
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error
    })
    //console.log(error)
  }
}

export const CardController = { createNew }
