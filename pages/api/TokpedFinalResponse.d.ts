declare module TokpedFinalResponse {
  interface TokpedJSON {
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
    ecom: string
  }

  interface TokpedOutputResponse {
    totalData: number
    products: TokpedJSON[]
  }
}

export default TokpedFinalResponse
