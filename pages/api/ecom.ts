import { NextApiRequest, NextApiResponse } from 'next'
import TokpedFinalResponse from '../../@types/api/TokpedFinalResponse'
import finalArray from '../../helper/arraySorting'
import TokpedFetch from '../../components/api/tokped'
import ShopeeFetch from '../../components/api/shopee'
import ShopeeFinalResponse from '../../@types/api/ShopeeFinalResponse'

const EcomFetch = async (req: NextApiRequest, res: NextApiResponse) => {
  const mergedArray: any[] = []
  const keyword = req.query.keyword ?? null

  try {
    if (!keyword) {
      throw new Error('check your query again!')
    }

    const tokpedResponse: TokpedFinalResponse.TokpedOutputResponse = await TokpedFetch(
      { keyword }
    )
    const shopeeResponse: ShopeeFinalResponse.ShopeeOutputResponse = await ShopeeFetch(
      { keyword }
    )

    if (tokpedResponse) {
      const tokpedResponseData: TokpedFinalResponse.TokpedOutputResponse = tokpedResponse

      tokpedResponseData.products.forEach((product) => {
        mergedArray.push(product)
      })
    }

    if (shopeeResponse) {
      const shopeeResponseData: ShopeeFinalResponse.ShopeeOutputResponse = shopeeResponse

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
