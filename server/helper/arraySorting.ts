import TokpedFinalResponse from '../@types/TokpedFinalResponse'

const compare = (
  a: TokpedFinalResponse.TokpedJSON,
  b: TokpedFinalResponse.TokpedJSON
) => {
  if (a.sold < b.sold) {
    return 1
  }
  if (a.sold > b.sold) {
    return -1
  }
  return 0
}

const finalArray = (array: TokpedFinalResponse.TokpedJSON[]) => {
  return array.sort(compare)
}

export default finalArray
