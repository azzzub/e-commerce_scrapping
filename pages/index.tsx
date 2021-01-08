import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Head from 'next/head'
import ProductWidget from '../components/widget/ProductWidget'

const Homepage = () => {
  const [keyword, setKeyword] = useState('')
  const [minPrice, setMinPrice] = useState('0')
  const [page, setPage] = useState('1')
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)

  const dummyProduct = [
    {
      name: 'This is the Long Product Name Blabla',
      price: 'Rp. 2,333,333',
      sold: 'Terjual 10',
      url: '/',
      image_url:
        'https://ecs7-p.tokopedia.net/img/cache/200-square/product-1/2020/8/29/47902568/47902568_ae358636-4e7d-4601-8e36-87cd5740f8fa_1000_1000',
      rating_average: '4,4'
    },
    {
      name: 'This is the Long Product Name Blabla',
      price: 'Rp. 2,333,333',
      sold: 'Terjual 10',
      url: '/',
      image_url:
        'https://ecs7-p.tokopedia.net/img/cache/200-square/product-1/2020/8/29/47902568/47902568_ae358636-4e7d-4601-8e36-87cd5740f8fa_1000_1000',
      rating_average: '4,4'
    },
    {
      name: 'This is the Long Product Name Blabla',
      price: 'Rp. 2,333,333',
      sold: 'Terjual 10',
      url: '/',
      image_url:
        'https://ecs7-p.tokopedia.net/img/cache/200-square/product-1/2020/8/29/47902568/47902568_ae358636-4e7d-4601-8e36-87cd5740f8fa_1000_1000',
      rating_average: '4,4'
    },
    {
      name: 'This is the Long Product Name Blabla',
      price: 'Rp. 2,333,333',
      sold: 'Terjual 10',
      url: '/',
      image_url:
        'https://ecs7-p.tokopedia.net/img/cache/200-square/product-1/2020/8/29/47902568/47902568_ae358636-4e7d-4601-8e36-87cd5740f8fa_1000_1000',
      rating_average: '4,4'
    },
    {
      name: 'This is the Long Product Name Blabla',
      price: 'Rp. 2,333,333',
      sold: 'Terjual 10',
      url: '/',
      image_url:
        'https://ecs7-p.tokopedia.net/img/cache/200-square/product-1/2020/8/29/47902568/47902568_ae358636-4e7d-4601-8e36-87cd5740f8fa_1000_1000',
      rating_average: '4,4'
    },
    {
      name: 'This is the Long Product Name Blabla',
      price: 'Rp. 2,333,333',
      sold: 'Terjual 10',
      url: '/',
      image_url:
        'https://ecs7-p.tokopedia.net/img/cache/200-square/product-1/2020/8/29/47902568/47902568_ae358636-4e7d-4601-8e36-87cd5740f8fa_1000_1000',
      rating_average: '4,4'
    }
  ]

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
    // const URL = 'http://localhost:5000/tokped/simple'
    const URL = 'http://localhost:5000/ecom/simple'
    try {
      const response = await axios.get(URL, {
        params: {
          keyword,
          min_price: minPrice,
          page
        }
      })

      if (response) {
        setData(response.data)
      }
    } catch (error) {
      alert(error)
    }
    setIsLoading(false)
  }

  return (
    <div className="mx-5 my-3 md:mx-10 md:my-4 lg:mx-32 lg:my-7">
      <Head>
        <title>Pricey</title>
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
            placeholder="Search for items, brand, and inspiration"
            required
            onChange={handleKeywordChange}
          />
          <FontAwesomeIcon
            className="cursor-pointer"
            type="submit"
            onClick={fetchHandler}
            icon={faSearch}
          />
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
    </div>
  )
}

export default Homepage
