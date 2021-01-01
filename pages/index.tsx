import React, { useState } from 'react'
import axios from 'axios'
import style from './index.module.css'

const Homepage = () => {
  const [keyword, setKeyword] = useState('')
  const [minPrice, setMinPrice] = useState('0')
  const [page, setPage] = useState('1')
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)

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
    const URL = 'http://localhost:5000/tokped/simple'
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
    <div>
      <h1>Tokped Scrapping!</h1>
      <form className={style.form__container} onSubmit={fetchHandler}>
        <label>Keyword: </label>
        <input type="text" required onChange={handleKeywordChange} />
        <label>Minimum Price: </label>
        <input type="number" onChange={handleMinPriceChange} />
        <label>Page: </label>
        <input type="number" onChange={handlePageChange} />
        <button type="submit" disabled={isLoading}>
          Fetch Data!
        </button>
      </form>
      <div className={style.widget__wrapper}>
        {data
          ? data.products.map((product, index) => (
              <Widget key={index} data={product} />
            ))
          : null}
      </div>
    </div>
  )
}

const Widget = ({ data }) => {
  const { name, price, sold, url, image_url, rating_average } = data
  return (
    <div className={style.widget__container}>
      <img src={image_url} />
      <h4>{name}</h4>
      <h4>{price}</h4>
      <p>{sold}</p>
      <p>{rating_average}</p>
      <button onClick={() => window.open(url)}>Link</button>
    </div>
  )
}

export default Homepage
