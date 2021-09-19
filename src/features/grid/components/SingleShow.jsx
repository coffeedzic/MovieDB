import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setLoading } from '../../../redux/reducers/settings-reducer'

import Loader from '../../loader/components/Loader' 

import noimage from '../images/noimage.png'
import '../styles/Single.css'

const SingleShow = () => {
  const { id } = useParams()
  const [show, setShow] = useState([])
  const history = useHistory()
  const loading = useSelector(state => state.settings.loading)
  const dispatch = useDispatch()

  const fetchShow = () => {
    dispatch(setLoading(true))
    axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=8f27b280bc7fc63dd2247eb5e1926ac7&language=en-US`)
    .then(response => {
      console.log(response.data)
      setShow(response.data)
      dispatch(setLoading(false))
    })
  }  

  useEffect(() => {
    fetchShow()
  }, [])

  const goBack = () => {
    history.goBack()
  }

  const renderShow = () => {
    return(
      <div className="single-movie">
        <div className="header">
          <div className="title-tagline">
            <div className="title">
              {show.name}
            </div>
            <div className="tagline">
              {show.tagline}
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
            <img src={show.poster_path ? 'https://image.tmdb.org/t/p/w500/' + show.poster_path : noimage} alt="Show poster" />
          </div>
          <div className="info">
            <div className="item">
              <div className="main"># of episodes:</div>
              <div className="text">{show.number_of_episodes}</div>
            </div>
            <div className="item">
              <div className="main">Genres:</div>
              <div className="text">
                {
                  show.genres ?
                  show.genres.map((item, index) => {
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
              <div className="main">First air date:</div>
              <div className="text">{show.first_air_date}</div>
            </div>
            <div className="item">
              <div className="main">Rating:</div>
              <div className="text">{show.vote_average}</div>
            </div>
            <div className="item break">
              <div className="main">Description:</div>
              <div className="text">{show.overview}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return(
    loading ? <Loader /> : renderShow()
  )
}

export default SingleShow