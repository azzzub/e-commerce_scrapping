import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import TokpedFinalResponse from './TokpedFinalResponse'
import finalArray from '../../helper/arraySorting'

const EcomFetch = async (req: NextApiRequest, res: NextApiResponse) => {
  const urlTokped = `http://${req.headers.host}/api/tokped`
  const urlShopee = `http://${req.headers.host}/api/shopee`
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
