import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { setLoading } from '../../../redux/reducers/settings-reducer'
import { setTopShows, setSearchShows } from '../../../redux/reducers/shows-reducer'

import Loader from '../../loader/components/Loader'

import noimage from '../images/noimage.png'
import '../styles/Grid.css'

const Shows = () => {
  const [siteInitialized, setSiteInitialized] = useState(false)
  const loading = useSelector(state => state.settings.loading)
  const topShows = useSelector(state => state.shows.topShows)
  const searchShows = useSelector(state => state.shows.searchShows)
  const query = useSelector(state => state.search.query)
  const dispatch = useDispatch()

  const topShowsFetch = () => {
    dispatch(setLoading(true))
    const callOne = 'https://api.themoviedb.org/3/tv/top_rated?api_key=8f27b280bc7fc63dd2247eb5e1926ac7&language=en-US&page=1'
    const callTwo = 'https://api.themoviedb.org/3/tv/top_rated?api_key=8f27b280bc7fc63dd2247eb5e1926ac7&language=en-US&page=2'
    const requestOne = axios.get(callOne)
    const requestTwo = axios.get(callTwo)
    
    axios.all([requestOne, requestTwo])
    .then(axios.spread((...response) => {
      const showsArray = [...response[0].data.results, ...response[1].data.results]
      dispatch(setTopShows(showsArray.splice(0, 30)))
      dispatch(setLoading(false))
    }))
  }

  const searchShowsFetch = () => {
    dispatch(setLoading(true))
    axios.get(`https://api.themoviedb.org/3/search/tv?api_key=8f27b280bc7fc63dd2247eb5e1926ac7&language=en-US&page=1&query=${query}&include_adult=false`)
    .then(response => {
      dispatch(setSearchShows(response.data.results))   
    })
  }

  useEffect(() => {
    if(query.length > 2) {
      const timeout = setTimeout(() => {
        searchShowsFetch()
        dispatch(setLoading(false))
      }, 350)
      
      return () => {
        clearTimeout(timeout)
      }
    } else {
      if(!siteInitialized) {
        setSiteInitialized(true)
        topShowsFetch()
      } else {
        dispatch(setLoading(false))
      }
    }
  }, [query])

  const renderTopShows = () => {
    if(topShows.length > 0) {
      return(
        <div className="grid">
          {topShows.map((item, index) => {
            return(
              <div
                className="item"
                key={index}
              >
                <div className="item-background">
                  <Link to={'/show/' + item.id}>
                    <img src={item.poster_path ? 'https://image.tmdb.org/t/p/w500/' + item.poster_path : noimage } />
                  </Link>
                </div>
                <div className="item-info">
                  <div className="title">
                    <Link to={'/show/' + item.id}>
                      {item.name}
                    </Link>
                  </div>
                  <div className="rating">
                    {item.vote_average}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )
    } else {
      return(
        <div className="response error">There was error fetching shows, please reload.</div>
      )
    }
  }

  const renderSearchShows = () => {
    if(searchShows.length > 0) {
      return(
        <div className="grid">
          {searchShows.map((item, index) => {
            return(
              <div
                className="item"
                key={index}
              >
                <div className="item-background">
                  <Link to={'/show/' + item.id}>
                    <img src={item.poster_path ? 'https://image.tmdb.org/t/p/w500/' + item.poster_path : noimage } />
                  </Link>
                </div>
                <div className="item-info">
                  <div className="title">
                    <Link to={'/show/' + item.id}>
                      {item.name}
                    </Link>
                  </div>
                  <div className="rating">
                    {item.vote_average}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )
    } else {
      if(loading) {
        return(
          <Loader />
        )
      } else {
        return(
          <div className="response">No results.</div>
        )
      }
    }
  }

  return(
    <main>
      <div className="page-title">
        Shows
      </div>
      {query.length > 2 ? renderSearchShows() : renderTopShows()}
    </main>      
  )
}

export default Shows