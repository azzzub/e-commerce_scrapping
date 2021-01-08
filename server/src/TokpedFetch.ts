import { Request, Response } from 'express'
import axios from 'axios'
import dotenv from 'dotenv'
import Tokped from '../@types/TokpedResponse'
import finalArray from '../helper/arraySorting'
import TokpedFinalResponse from '../@types/TokpedFinalResponse'
dotenv.config()

const TokpedFetch = async (req: Request, res: Response) => {
  const keyword = req.query.keyword ?? null

  const URL = 'https://gql.tokopedia.com/'

  const data = {
    query:
      'query SearchProductQueryV4($params: String!) {\n  ace_search_product_v4(params: $params) {\n    header {\n      totalData\n    }\n    data {\n      suggestion {\n        currentKeyword\n      }\n      products {\n        id\n        name\n        badges {\n          title\n          imageUrl\n          show\n          __typename\n        }\n        imageUrl\n        labelGroups {\n          position\n          title\n          type\n          __typename\n        }\n        price\n        rating\n        ratingAverage\n        shop {\n          id\n          name\n          url\n          city\n          isOfficial\n          isPowerBadge\n        }\n        url\n      }\n    }\n  }\n}\n',
    variables: {
      params: `device=desktop&q=${keyword}&related=true&rows=200&source=search`
    },
    operationName: 'SearchProductQueryV4'
  }
  const headers = {
    'accept-language': 'id-ID,id;q=0.9',
    cookie: ''
  }

  try {
    if (!keyword) {
      throw new Error('check your query again!')
    }

    const response = await axios.post(URL, data, { headers })

    let tokpedProduct: any[] = []

    if (response) {
      const tokpedResponse: Tokped.TokpedResponse = response.data
      const totalData =
        tokpedResponse.data.ace_search_product_v4.header.totalData
      const rawDataTokped = tokpedResponse.data.ace_search_product_v4.data

      rawDataTokped.products.map((product: Tokped.TokpedProduct) => {
        let soldString = ''
        product.labelGroups.forEach((element: Tokped.TokpedLabelGroup) => {
          if (element.position === 'integrity') {
            soldString = element.title
          }
        })

        const price = parseInt(
          product.price?.replace('Rp', '').replace('.', '')
        )
        const isThousands = soldString.split(' ').length

        let sold

        if (isThousands === 2) {
          sold = parseInt(soldString.split(' ')[1])
        } else {
          sold = parseInt(soldString.split(' ')?.[1]?.replace(',', '')) * 100
        }

        const rating = parseFloat(product.ratingAverage?.replace(',', '.'))

        const finalTokpedProductJson: TokpedFinalResponse.TokpedJSON = {
          id: product.id,
          name: product.name,
          url: product.url,
          imageUrl: product.imageUrl,
          price,
          priceString: product.price,
          sold,
          soldString,
          rating,
          ratingString: product.ratingAverage,
          ecom: 'Tokped'
        }

        tokpedProduct.push(finalTokpedProductJson)
      })

      const soldSortingArray = finalArray(tokpedProduct)

      const jsonData: TokpedFinalResponse.TokpedOutputResponse = {
        totalData,
        products: soldSortingArray
      }

      res.json(jsonData)
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

export default TokpedFetch
