import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import TokpedSVG from '../svg/tokped.svg'

interface WidgetProps {
  key: number
  product: TokpedProduct
}

const clickHandler = (url: string) => {
  window.open(url)
}

const ProductWidget: React.FC<WidgetProps> = ({ product }) => {
  const { name, priceString, soldString, url, imageUrl, ratingString } = product

  return (
    <div
      onClick={() => clickHandler(url)}
      className="flex flex-col cursor-pointer hover:opacity-80"
    >
      <img className="rounded-3xl" src={imageUrl} />
      <span className="text-sm mt-1">{name}</span>
      <span className="font-extrabold text-lg">{priceString}</span>
      <div className="flex">
        <p className="text-sm">Produk dari</p>
        <TokpedSVG className="ml-1.5 w-20" />
      </div>
      <div className="flex flex-row justify-between">
        <p>{soldString}</p>
        <div>
          <span className="mr-1">{ratingString}</span>
          <FontAwesomeIcon icon={faStar} className="text-yellow-500 text-sm" />
        </div>
      </div>

      {/* <button
        className="bg-black rounded-lg text-white w-min px-4 py-1 m-auto my-0 mt-2"
        onClick={() => window.open(url)}
      >
        LINK
      </button> */}
    </div>
  )
}

export default ProductWidget
