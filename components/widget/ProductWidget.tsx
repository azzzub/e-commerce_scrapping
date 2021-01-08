import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import TokpedSVG from '../svg/tokped-logo.svg'
import ShopeeSVG from '../svg/shopee-logo.svg'
import charLimiting from '../../helper/charLimiting'

interface WidgetProps {
  key: number
  product: TokpedProduct
}

const clickHandler = (url: string) => {
  window.open(url)
}

const ProductWidget: React.FC<WidgetProps> = ({ product }) => {
  const {
    name,
    priceString,
    soldString,
    url,
    imageUrl,
    ratingString,
    ecom
  } = product

  return (
    <div
      onClick={() => clickHandler(url)}
      className="flex flex-col cursor-pointer hover:opacity-80 border-2 border-gray-50 rounded-b-2xl shadow-md"
    >
      <img className="rounded-b-2xl" src={imageUrl} />
      <div className="p-1 flex flex-col">
        <span className="text-sm mt-1">{charLimiting(name).toLowerCase()}</span>
        <span className="font-extrabold text-lg">{priceString}</span>
        <div className="flex items-center">
          <p className="text-sm">Produk dari</p>
          {ecom === 'Tokped' ? (
            <TokpedSVG className="ml-1.5 w-20" />
          ) : (
            <ShopeeSVG className="ml-1.5 w-18" />
          )}
        </div>
        <div className="flex flex-row justify-between">
          <p>{soldString}</p>
          <div>
            <span className="mr-1">{ratingString}</span>
            <FontAwesomeIcon
              icon={faStar}
              className="text-yellow-500 text-sm"
            />
          </div>
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
