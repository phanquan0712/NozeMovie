import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import './Hero-Slide.scss'
import tmdbApi, { category, movieType } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useHistory } from 'react-router-dom';
import Button, { OutlineButton } from '../Button/Button';
import Modal, { ModalContent } from '../Modal/Modal';
const HeroSlide = props => {
   SwiperCore.use([Autoplay]);
   const [movieItems, setMovieItems] = useState([])

   useEffect(() => {
      const getMovies = async () => {
         const params = { page: 1 };
         try {
            const response = await tmdbApi.getMoviesList(movieType.popular, { params });
            setMovieItems(response.data.results.slice(0, 4))
         }
         catch (err) {
            console.log(err);
         }
      }
      getMovies();
   }, [])

   return (
      <div className='hero-slide'>
         <Swiper
            modules={[Autoplay]}
            grabCursor={true}
            spaceBetween={0}
            slidesPerView={1}
         >
            {
               movieItems.map((movie, index) => (
                  <SwiperSlide key={index}>
                     {({ isActive }) => (
                        <HeroSlideItem
                           item={movie}
                           className={`${isActive ? 'active' : ''}`}
                        />
                     )}
                  </SwiperSlide>
               ))
            }
         </Swiper>
         {
            movieItems.map((movie, index) => (<TrailerModal key={index} item={movie} />))
         }
      </div>
   )
}

HeroSlide.propTypes = {}



const HeroSlideItem = (props) => {
   let history = useHistory();
   let item = props.item;
   const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

   const setModalActive = async() => {
      const modal = document.querySelector('#modal_' + item.id);
      const video = await tmdbApi.getVideos(category.movie, item.id);
      console.log(video);
      if(video.data.results.length > 0) {
         const videoSrc = 'http://www.youtube.com/embed/' + video.data.results[0].key;
         modal.querySelector('.modal__content > iframe').setAttribute('src', videoSrc);
      }
      else {
         modal.querySelector('.modal__content > iframe').innerHTML = 'No trailer available';
      }

      modal.classList.toggle('active');
   }

   return (
      <div
         className={`hero-slide__item ${props.className}`}
         style={{ backgroundImage: `url(${background})` }}
      >
         <div className="hero-slide__item__content cointainer">
            <div className="hero-slide__item__content__info">
               <h2 className="title">{item.title}</h2>
               <div className="overview">{item.overview}</div>
               <div className="btns">
                  <Button
                     onClick={() => history.push('/movie/' + item.id)}
                  >
                     Watch now
                  </Button>
                  <OutlineButton
                     onClick={setModalActive}
                  >
                     Watch trailer
                  </OutlineButton>
               </div>
            </div>
            <div className="hero-slide__item__content__poster">
               <img src={apiConfig.w500Image(item.poster_path)} alt="" />
            </div>
         </div>
      </div>
   )
}

const TrailerModal = (props) => {
   const item = props.item;
   const iframeRef = useRef(null);
   const onClose = () => iframeRef.current.setAttribute('src', '');
   return (
      <Modal active={false} id={`modal_${item.id}`}>
         <ModalContent onClose={onClose}>
            <iframe
               ref={iframeRef}
               width="100%"
               height="500px"
               title="trailer"
            />
         </ModalContent>
      </Modal>
   )
}

export default HeroSlide