declare module Shopee {
  interface ShopeeItems {
    itemid: number
    image: string
    sold: number
    price: number
    name: string
    shopid: number
  }

  interface ShopeeResponse {
    total_count: number
    items: ShopeeItems[]
  }
}

export default Shopee
