import React from 'react'
import { useHistory } from 'react-router-dom'

import '../styles/Error.css'

const Error = () => {
  const history = useHistory()

  const goBack = () => {
    history.goBack()
  }
  
  return(
    <div className="error-page">
      <div className="large">
        404
      </div>
      <div className="text">
        Page not found, go to <span onClick={goBack}>main page</span>
      </div>
    </div>
  )
}

export default Error