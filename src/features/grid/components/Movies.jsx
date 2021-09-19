import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { setLoading } from '../../../redux/reducers/settings-reducer'
import { setTopMovies, setSearchMovies } from '../../../redux/reducers/movies-reducer'

import noimage from '../images/noimage.png'
import '../styles/Grid.css'

const Movies = () => {
  const [siteInitialized, setSiteInitialized] = useState(false)
  const loading = useSelector(state => state.settings.loading)
  const topMovies = useSelector(state => state.movies.topMovies)
  const searchMovies = useSelector(state => state.movies.searchMovies)
  const query = useSelector(state => state.search.query)
  const dispatch = useDispatch()

  const topMoviesFetch = () => {
    dispatch(setLoading(true))
    const callOne = 'https://api.themoviedb.org/3/movie/top_rated?api_key=8f27b280bc7fc63dd2247eb5e1926ac7&language=en-US&page=1'
    const callTwo = 'https://api.themoviedb.org/3/movie/top_rated?api_key=8f27b280bc7fc63dd2247eb5e1926ac7&language=en-US&page=2'
    const requestOne = axios.get(callOne)
    const requestTwo = axios.get(callTwo)
    
    axios.all([requestOne, requestTwo])
    .then(axios.spread((...response) => {
      const moviesArray = [...response[0].data.results, ...response[1].data.results]
      dispatch(setTopMovies(moviesArray.splice(0, 30)))
      dispatch(setLoading(false))
    }))
  }

  const searchMoviesFetch = () => {
    dispatch(setLoading(true))
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=8f27b280bc7fc63dd2247eb5e1926ac7&language=en-US&query=${query}&page=1&include_adult=false`)
    .then(response => {
      dispatch(setSearchMovies(response.data.results))
      dispatch(setLoading(false))
    })
  }

  useEffect(() => {
    if(query.length > 2) {
      searchMoviesFetch()
    } else {
      if(!siteInitialized) {
        setSiteInitialized(true)
        topMoviesFetch()
      }
    }
  }, [query])

  const renderTopMovies = () => {
    if(topMovies.length > 0) {
      return(
        <div className="grid">
          {topMovies.map((item, index) => {
            return(
              <div
                className="item"
                key={index}
              >
                <div className="item-background">
                  <Link to={'/movie/' + item.id}>
                    <img src={item.poster_path ? 'https://image.tmdb.org/t/p/w500/' + item.poster_path : noimage } />
                  </Link>
                </div>
                <div className="item-info">
                  <div className="title">
                    <Link to={'/movie/' + item.id}>
                      {item.title}
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
        <div className="response error">There was error fetching movies, please reload your page.</div>
      )
    }
  }

  const renderSearchMovies = () => {
    if(searchMovies.length > 0) {
      return(
        <div className="grid">
          {searchMovies.map((item, index) => {
            return(
              <div
                className="item"
                key={index}
              >
                <div className="item-background">
                  <Link to={'/movie/' + item.id}>
                    <img src={item.poster_path ? 'https://image.tmdb.org/t/p/w500/' + item.poster_path : noimage } />
                  </Link>
                </div>
                <div className="item-info">
                  <div className="title">
                    <Link to={'/movie/' + item.id}>
                      {item.title}
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
        <div className="response">No results.</div>
      )
    }
  }

  return(
    <main>
      <div className="page-title">
        Movies
      </div>
      {query.length > 2 ? renderSearchMovies() : renderTopMovies()}
    </main>      
  )
}

export default Movies