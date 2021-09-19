import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setLoading } from '../../../redux/reducers/settings-reducer'

import Loader from '../../loader/components/Loader'
import Error from '../../error/components/Error'

import noimage from '../images/noimage.png'
import '../styles/Single.css'

const SingleMovie = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState([])
  const [error, setError] = useState(false)
  const history = useHistory()
  const loading = useSelector(state => state.settings.loading)
  const dispatch = useDispatch()

  const fetchMovie = () => {
    dispatch(setLoading(true))
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=8f27b280bc7fc63dd2247eb5e1926ac7&language=en-US`, { validateStatus: false })
    .then(response => {
      if(response.status === 200) {
        setMovie(response.data)
        dispatch(setLoading(false))
      } else {
        setError(true)
        dispatch(setLoading(false))
      }      
    })   
  }  

  useEffect(() => {
    fetchMovie()
  }, [])

  const goBack = () => {
    history.goBack()
  }

  const renderMovie = () => {
    if(!error) {
      return(
        <div className="single-movie">
          <div className="header">
            <div className="title-tagline">
              <div className="title">
                {movie.title}
              </div>
              <div className="tagline">
                {movie.tagline}
              </div>
            </div>
            <span
              onClick={goBack}
            >
              Back
            </span>
          </div>
          <div className="general-info">
            <div className="image">
              <img src={movie.poster_path ? 'https://image.tmdb.org/t/p/w500/' + movie.poster_path : noimage} alt="Movie poster" />
            </div>
            <div className="info">
              <div className="item">
                <div className="main">Budget:</div>
                <div className="text">{movie.budget}$</div>
              </div>
              <div className="item">
                <div className="main">Genres:</div>
                <div className="text">
                  {
                    movie.genres ?
                    movie.genres.map((item, index) => {
                      return(
                        <span 
                          key={index}
                        >
                          {item.name + ' '}
                        </span>
                      )
                    })
                    :
                    null
                  }
                </div>
              </div>
              <div className="item">
                <div className="main">Release date:</div>
                <div className="text">{movie.release_date}</div>
              </div>
              <div className="item">
                <div className="main">Rating:</div>
                <div className="text">{movie.vote_average}</div>
              </div>
              <div className="item break">
                <div className="main">Description:</div>
                <div className="text">{movie.overview}</div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return(
        <Error />
      )
    }
  }

  return(
    loading ? <Loader /> : renderMovie()
  )
}

export default SingleMovie