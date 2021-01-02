import express, { Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())

const tokpedFetch = async (req: Request, res: Response) => {
  const URL = 'https://gql.tokopedia.com/'

  const data = {
    query:
      'query SearchProductQueryV4($params: String!) {\n  ace_search_product_v4(params: $params) {\n    header {\n      totalData\n    }\n    data {\n      suggestion {\n        currentKeyword\n      }\n      products {\n        id\n        name\n        badges {\n          title\n          imageUrl\n          show\n          __typename\n        }\n        imageUrl\n        labelGroups {\n          position\n          title\n          type\n          __typename\n        }\n        price\n        rating\n        ratingAverage\n        shop {\n          id\n          name\n          url\n          city\n          isOfficial\n          isPowerBadge\n        }\n        url\n      }\n    }\n  }\n}\n',
    variables: {
      params:
        'device=desktop&q=galaxy%20fold&related=true&rows=200&source=search'
    },
    operationName: 'SearchProductQueryV4'
  }
  const headers = {
    // accept: '*/*',
    'accept-language': 'id-ID,id;q=0.9',
    cookie: ''
    // 'cache-control': 'no-cache',
    // 'content-type': 'application/json',
    // pragma: 'no-cache',
    // 'sec-fetch-dest': 'empty',
    // 'sec-fetch-mode': 'cors',
    // 'sec-fetch-site': 'same-site',
    // // 'tkpd-userid': '10962650',
    // 'x-device': 'desktop-0.0',
    // 'x-source': 'tokopedia-lite',
    // 'x-tkpd-lite-service': 'zeus',
  }

  try {
    const response = await axios.post(URL, data, { headers })
    if (response) {
      res.json(response.data)
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

const shopeeFetch = async (req: Request, res: Response) => {
  const URL = 'https://shopee.co.id/api/v2/search_items'
  const params = {
    keyword: 'macbook pro',
    by: 'relevancy',
    page_type: 'search',
    version: '2'
  }
  try {
    const response = await axios.get(URL, { params })
    if (response) {
      res.json(response.data)
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
