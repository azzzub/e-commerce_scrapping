declare module Shopee {
  interface ItemRating {
    rating_star: number
  }

  interface ShopeeItems {
    itemid: number
    image: string
    historical_sold: number
    price: number
    name: string
    shopid: number
    item_rating: ItemRating
    ecom: string
  }

  interface ShopeeResponse {
    total_count: number
    items: ShopeeItems[]
  }
}

export default Shopee
