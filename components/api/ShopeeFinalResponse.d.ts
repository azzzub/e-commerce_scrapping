declare module ShopeeFinalResponse {
  interface ShopeeJSON {
    id: number
    name: string
    url: string
    imageUrl: string
    price: number
    priceString: string
    sold: number
    soldString: string
    rating: number
    ratingString: string
  }

  interface ShopeeOutputResponse {
    totalData: number
    products: ShopeeJSON[]
  }
}

export default ShopeeFinalResponse
