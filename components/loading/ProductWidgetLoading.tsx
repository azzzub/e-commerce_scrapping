import React from 'react'
import Lottie from 'react-lottie'
import animationData from '../lottie/laptop-glob.json'

function ProductWidgetLoading() {
  return (
    <div className="flex flex-col-reverse lg:flex-row -mt-6 lg:mt-0">
      <div className="bg-gray-50 shadow-md rounded-b-2xl w-1/2 md:w-1/4 lg:w-1/6">
        <div className="animate-pulse bg-gray-300 w-full h-40 rounded-b-2xl"></div>
        <div className="animate-pulse p-2">
          <div className="bg-gray-200 w-5/6 h-3"></div>
          <div className="bg-gray-300 w-4/6 h-5 mt-2"></div>
          <div className="bg-gray-200 w-6/6 h-3 mt-2"></div>
        </div>
      </div>

      <div className="flex flex-row items-center w-full justify-center">
        <Lottie
          options={{
            autoplay: true,
            loop: true,
            animationData: animationData
          }}
          height={100}
          width={100}
          style={{ margin: 0 }}
        />
        <span className="text-gray-800 ml-3">
          Kita lagi siapin datanya buat kamu. Tunggu bentar...
        </span>
      </div>
    </div>
  )
}

export default ProductWidgetLoading
