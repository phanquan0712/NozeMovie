import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import tmdbApi, { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import './MovieList.scss'
import MovieCard from '../Movie-card/MovieCard';
const MovieList = props => {
   const [items, setItems] = useState([]);

   useEffect(() => {
      const getList = async() => {
         let response  = null;
         const params = {};

         if(props.type !== 'similar') {
            switch(props.type) {
               case category.movie: 
                  response = await tmdbApi.getMoviesList(props.type, {params})
                  break;
               default  : 
                  response = await tmdbApi.getTvList(props.type, {params})
            }
         }
         else {
            response = await tmdbApi.similar(props.category, props.id)
         }
         setItems(response.data.results);
      }
      getList();
   }, [])
   return (
      <div className='movie-list'>
         <Swiper
            grabCursor={true}
            spaceBetween={10}
            slidesPerView={'auto'}
         >
            {
               items.map((item, index) => (
                  <SwiperSlide key={index}>
                     <MovieCard category={props.category} item={item} />
                  </SwiperSlide>
               ))
            }
         </Swiper>
      </div>
   )
}

MovieList.propTypes = {
   category: PropTypes.string.isRequired,
   type: PropTypes.string.isRequired
}

export default MovieList