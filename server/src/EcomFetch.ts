import { Request, Response } from 'express'
import axios from 'axios'
import TokpedFinalResponse from '../@types/TokpedFinalResponse'
import finalArray from '../helper/arraySorting'

const EcomFetch = async (req: Request, res: Response) => {
  const urlTokped = 'http://' + req.get('host') + '/tokped/simple'
  const urlShopee = 'http://' + req.get('host') + '/shopee/simple'
  const mergedArray: any[] = []
  const keyword = req.query.keyword ?? null

  try {
    if (!keyword) {
      throw new Error('check your query again!')
    }

    const tokpedResponse = await axios.get(urlTokped, {
      params: {
        keyword
      }
    })

    const shopeeResponse = await axios.get(urlShopee, {
      params: {
        keyword
      }
    })

    if (tokpedResponse) {
      const tokpedResponseData: TokpedFinalResponse.TokpedOutputResponse =
        tokpedResponse.data

      tokpedResponseData.products.forEach((product) => {
        mergedArray.push(product)
      })
    }

    if (shopeeResponse) {
      const shopeeResponseData: TokpedFinalResponse.TokpedOutputResponse =
        shopeeResponse.data

      shopeeResponseData.products.forEach((product) => {
        mergedArray.push(product)
      })
    }

    const finalSortArray = finalArray(mergedArray)

    const finalResponse = {
      totalData: mergedArray.length,
      products: finalSortArray
    }

    if (tokpedResponse && shopeeResponse) {
      res.json(finalResponse)
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

export default EcomFetch
