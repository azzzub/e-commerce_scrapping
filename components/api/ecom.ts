import finalArray from '../../helper/arraySorting'
import TokpedFetch from './tokped'
import ShopeeFetch from './shopee'

const EcomFetch = async ({ keyword }) => {
  const mergedArray: any[] = []

  try {
    if (!keyword) {
      throw new Error('check your query again!')
    }

    const tokpedResponse = await TokpedFetch({ keyword })

    const shopeeResponse = await ShopeeFetch({ keyword })

    if (tokpedResponse) {
      const tokpedResponseData: any = tokpedResponse

      tokpedResponseData.products.forEach((product) => {
        mergedArray.push(product)
      })
    }

    if (shopeeResponse) {
      const shopeeResponseData: any = shopeeResponse

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
      return finalResponse
    }
  } catch (error) {
    return {
      message: error.message
    }
  }
}

export default EcomFetch
