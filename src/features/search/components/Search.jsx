import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setQuery, setTyping } from '../../../redux/reducers/search-reducer'

import SearchLoader from '../../loader/components/SearchLoader'

import '../styles/Search.css'

const Search = () => {
  const query = useSelector(state => state.search.query)
  const loading = useSelector(state => state.settings.loading)
  const dispatch = useDispatch()

  const handleInput = event => {
    dispatch(setQuery(event.target.value))
    dispatch(setTyping(true))
    setTimeout(() => {
      dispatch(setTyping(false))
    }, 500)
  }
  return(
    <div className="search">
      <div className="input-wrap">
        <input
          type="text"
          value={query}
          onChange={handleInput}
          placeholder="Search for movie or tv show"
        />
        {loading ? <SearchLoader />  : null}
      </div>
    </div>
  )
}

export default Search