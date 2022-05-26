import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'
import './Detail.scss'
import CastList from './CastList'
import VideoList from './VideoList'
import MovieList from '../../components/Movie-list/MovieList'
const Detail = props => {
   const { category, id } = useParams();
   const [item, setItem] = useState({});

   useEffect(async () => {
      const getDetail = await tmdbApi.detail(category, id, { params: {} });
      setItem(getDetail.data);
      console.log(getDetail.data);
      window.scrollTo(0, 0);
   }, [category, id])
   return (
      <>
         {
            item &&
            (
               <>
                  <div className="banner" style={{
                     backgroundImage:
                        `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`
                  }}
                  ></div>
                  <div className="movie-content container mb-3">
                     <div className="movie-content__poster">

                        <div className="movie-content__poster__img" style={{
                           backgroundImage:
                              `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})`
                        }}></div>
                     </div>
                     <div className="movie-content__info">
                        <h1 className="title">
                           {item.title || item.name}
                        </h1>
                        <div className="genres">
                           {
                              item.genres && item.genres.slice(0, 5).map(genre => (
                                 <span className='genres__item' key={genre.id}>{genre.name}</span>
                              ))
                           }
                        </div>
                        <p className="overview">{item.overview}</p>
                        <div className="cast">
                           <div className="section__header">
                              <h2>Cats</h2>
                           </div>
                           <CastList id={item.id} />
                        </div>
                     </div>
                  </div>
                  <div className="container">
                     <div className="section mb-3">
                           <VideoList id={item.id} />
                     </div>
                     <div className="section mb-3">
                        <div className="section__header mb-2">
                           <h2>Similar</h2>
                        </div>
                        <MovieList category={category} type='similar' id={id}/>
                     </div>
                  </div>
               </>
            )
         }
      </>
   )
}

Detail.propTypes = {}

export default Detail