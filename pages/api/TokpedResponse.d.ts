declare module Tokped {
  interface TokpedLabelGroup {
    position: string
    title: string
  }

  interface TokpedShop {
    id: number
    name: string
    url: string
    city: string
    isOfficial: boolean
    isPowerBadge: boolean
  }

  interface TokpedProduct {
    id: number
    name: string
    imageUrl: string
    labelGroups: TokpedLabelGroup[]
    price: string
    ratingAverage: string
    shop: TokpedShop
    url: string
  }

  interface TokpedResponse {
    data: {
      ace_search_product_v4: {
        header: {
          totalData: number
        }
        data: {
          suggestion: {
            currentKeyword: string
          }
          products: TokpedProduct[]
        }
      }
    }
  }
}

export default Tokped
