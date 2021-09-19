import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import '../../../helpers/icons.js'
import '../styles/Header.css'

const Header = () => {
  return(
    <header>
      <div className="logo">
        <div className="image">
          <FontAwesomeIcon icon="compact-disc" />
        </div>
        <div className="text">
          MovieDB
        </div>
      </div>
      <nav>
        <Link to="/movies">
          Movies
        </Link>
        <Link to="/shows">
          TV Shows
        </Link>
      </nav>
    </header>
  )
}

export default Header