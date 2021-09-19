import React from 'react'

import '../styles/Loader.css'

const Loader = () => {
  return(
    <div className="loader-wrap">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>    
  )
}

export default Loader