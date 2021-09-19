import React from 'react'

import loader from '../images/loading.png'
import '../styles/SearchLoader.css'

const Loader = () => {
  return(
    <div className="search-loader-wrap">
      <div className="search-loader">
        <img src={loader} />
      </div>
    </div>    
  )
}

export default Loader