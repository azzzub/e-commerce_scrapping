import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Head from 'next/head'
import ProductWidget from '../components/widget/ProductWidget'
import ProductWidgetLoading from '../components/loading/ProductWidgetLoading'
import EcomFetch from '../components/api/ecom'
// import TokpedFetch from '../components/api/tokped'
// import ShopeeFetch from '../components/api/shopee'

const Homepage = () => {
  const [keyword, setKeyword] = useState('')
  const [minPrice, setMinPrice] = useState('0')
  const [page, setPage] = useState('1')
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const [finalKeyword, setFinalKeyword] = useState('')

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value)
  }

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value)
  }

  const handlePageChange = (event) => {
    setPage(event.target.value)
  }

  const fetchHandler = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setData(null)
    setFinalKeyword(keyword)
    try {
      setData(await EcomFetch({ keyword }))
    } catch (error) {
      alert(error)
    }
    setIsLoading(false)
  }

  return (
    <div className="mx-5 my-3 md:mx-10 md:my-4 lg:mx-32 lg:my-7">
      <Head>
        <title>Pricey {finalKeyword === '' ? '' : `- ${finalKeyword}`}</title>
      </Head>
      <nav className="flex flex-col md:flex-row w-full h-auto items-center justify-between mb-7">
        <h1>pricey</h1>
        <form
          onSubmit={fetchHandler}
          className="flex flex-row bg-gray-100 px-5 py-2 rounded-xl items-center mt-3 lg:mt-0"
        >
          <input
            className="bg-transparent text-gray-700 mr-3 w-full lg:w-96"
            type="text"
            placeholder="Cari barang, merk, dll"
            required
            onChange={handleKeywordChange}
          />
          <button type="submit">
            <FontAwesomeIcon
              className="cursor-pointer p-2"
              icon={faSearch}
              size="2x"
            />
          </button>
        </form>
      </nav>
      {/* <form className="flex flex-col" onSubmit={fetchHandler}>
        <label>Minimum Price: </label>
        <input type="number" onChange={handleMinPriceChange} />
        <label>Page: </label>
        <input type="number" onChange={handlePageChange} />
        <button className="btn-primary" type="submit" disabled={isLoading}>
          Fetch Data!
        </button>
      </form> */}
      {isLoading ? (
        <ProductWidgetLoading />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {data
            ? data.products.map((product: TokpedProduct, index: number) => (
                <ProductWidget key={index} product={product} />
              ))
            : null}
          {/* {dummyProduct.map((product, index) => (
          <Widget key={index} product={product} />
        ))}
        {dummyProduct.map((product, index) => (
          <Widget key={index} product={product} />
        ))} */}
        </div>
      )}
    </div>
  )
}

export default Homepage
