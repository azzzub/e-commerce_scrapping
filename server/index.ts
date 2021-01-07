import express, { Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import axios from 'axios'
import dotenv from 'dotenv'
import Tokped from './@types/TokpedResponse'
import finalArray from './helper/arraySorting'
import Shopee from './@types/ShopeeResponse'
dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())

const tokpedFetch = async (req: Request, res: Response) => {
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

        const finalTokpedProductJson = {
          id: product.id,
          name: product.name,
          url: product.url,
          imageUrl: product.imageUrl,
          price,
          priceString: product.price,
          sold,
          soldString,
          rating,
          ratingString: product.ratingAverage
        }

        tokpedProduct.push(finalTokpedProductJson)
      })

      const soldSortingArray = finalArray(tokpedProduct)

      const jsonData = {
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

const shopeeFetch = async (req: Request, res: Response) => {
  const keyword = req.query.keyword ?? null

  const URL = 'https://shopee.co.id/api/v2/search_items/'
  const params = {
    keyword,
    by: 'relevancy',
    page_type: 'search',
    version: '2',
    limit: 50,
    newest: 0,
    order: 'desc'
  }

  const headers = {
    'if-none-match-': '*'
  }

  try {
    if (!keyword) {
      throw new Error('check your query again!')
    }

    const response = await axios.get(URL, { params, headers })

    const rawShopeeData: Shopee.ShopeeResponse = response.data

    const products = rawShopeeData.items

    let shopeeProductFinal: any[] = []

    products.map((product: Shopee.ShopeeItems) => {
      const soldString =
        'Terjual ' +
        (product.sold < 1000
          ? product.sold
          : (product.sold / 1000).toFixed(1).replace('.', ',') + ' rb')

      const price = (product.price / 100000).toFixed(0)
      const priceString =
        'Rp' + parseInt(price).toLocaleString().replace(',', '.')
      const ecom = 'Shopee'

      const object = {
        name: product.name,
        imageUrl: `https://cf.shopee.co.id/file/${product.image}_tn`,
        url: `https://shopee.co.id/${product.name.replace(/ /g, '-')}-i.${
          product.shopid
        }.${product.itemid}`,
        sold: product.sold,
        soldString,
        price,
        priceString,
        ecom
      }
      shopeeProductFinal.push(object)
    })

    const shopeeFinalData = {
      totalData: rawShopeeData.total_count,
      products: shopeeProductFinal
      // rawProd: rawShopeeData
    }

    if (response) {
      res.json(shopeeFinalData)
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

app.get('/tokped/simple', tokpedFetch)
app.get('/shopee/simple', shopeeFetch)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
