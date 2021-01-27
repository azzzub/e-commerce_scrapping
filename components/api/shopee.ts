import axios from 'axios'
import ShopeeFinalResponse from '../../@types/api/ShopeeFinalResponse'
import Shopee from '../../@types/api/ShopeeResponse'

const ShopeeFetch = async ({ keyword }) => {
  const URL =
    'https://pricey.yuanaayubs.workers.dev/?https://shopee.co.id/api/v2/search_items/?'
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
    'if-none-match-': '*',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded'
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
        (product.historical_sold < 1000
          ? product.historical_sold
          : (product.historical_sold / 1000).toFixed(1).replace('.', ',') +
            ' rb')

      const price = parseFloat((product.price / 100000).toFixed(0))
      const priceString = 'Rp' + price.toLocaleString().replace(',', '.')

      const object = {
        id: product.itemid,
        name: product.name,
        imageUrl: `https://cf.shopee.co.id/file/${product.image}_tn`,
        url: `https://shopee.co.id/${product.name.replace(/ /g, '-')}-i.${
          product.shopid
        }.${product.itemid}`,
        sold: product.historical_sold,
        soldString,
        price,
        priceString,
        rating: parseFloat(product.item_rating.rating_star.toFixed(1)),
        ratingString: product.item_rating.rating_star.toFixed(1).toString(),
        ecom: 'Shopee'
      }
      shopeeProductFinal.push(object)
    })

    const shopeeFinalData: ShopeeFinalResponse.ShopeeOutputResponse = {
      totalData: rawShopeeData.total_count,
      products: shopeeProductFinal
      // rawProd: rawShopeeData
    }

    // console.log(shopeeFinalData)
    return shopeeFinalData
  } catch (error) {
    throw Error(error.message)
  }
}

export default ShopeeFetch
