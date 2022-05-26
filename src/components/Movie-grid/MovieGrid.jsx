import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import './MovieGrid.scss'
import MovieCard from '../Movie-card/MovieCard'
import { useParams, useHistory } from 'react-router-dom'
import Input from '../Input/Input';
import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi'
import Button, { OutlineButton } from '../Button/Button';
const MovieGrid = props => {
   const [items, setItems] = useState([]);
   const [page, setPage] = useState(1);
   const [totalPage, setTotalPage] = useState(0);
   const { keyword } = useParams();
   
   useEffect(() => {
      const getList = async () => {
         try {
            let response = null;
            if (keyword === undefined) {
               const params = {};
               switch (props.category) {
                  case category.movie:
                     response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
                     break;
                  default:
                     response = await tmdbApi.getTvList(tvType.popular, { params });
               }
            }
            else {
               const params = { query: keyword };
               response = await tmdbApi.search(props.category, { params });
            }
            setItems(response.data.results);
            setTotalPage(response.data.total_pages);
         }
         catch (err) {
            console.log(err);
         }
      }
      getList();
      return () => {

      }
   }, [props.category, keyword]);

   const loadMore = async () => {
      let response = null;
      if (keyword === undefined) {
         const params = { page: page + 1 };
         switch (props.category) {
            case category.movie:
               response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
               break;
            default:
               response = await tmdbApi.getTvList(tvType.popular, { params });
         }
      }
      else {
         const params = { page: page + 1, query: keyword };
         response = await tmdbApi.search(props.category, { params });
      }
      setItems([...items, ...response.data.results]);
      setPage(page + 1);
   }
   return (
      <>
         <div className="section mb-3">
            <MovieSearch category={props.category} keyword={keyword} />
         </div>
         <div className='movie-grid'>
            {
               items.map((item, index) => (
                  <MovieCard key={index} item={item} category={props.category} />
               ))
            }
         </div>
         {
            page < totalPage ? (
               <div className="movie-grid__loadmore">
                  <OutlineButton className='small' onClick={loadMore}>Load more</OutlineButton>
               </div>
            ) : null
         }
      </>
   )
}


const MovieSearch = (props) => {
   const history = useHistory();
   const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');
   const goToSearch = useCallback(
      () => {
         if(keyword.trim().length > 0) {
            history.push(`${category[props.category]}/search/${keyword}`)
         }
      },
      [props.category, keyword, history],
   )

   useEffect(() => {
      const enterEvent = (e) => {
         e.preventDefault()
         if(e.keyCode === 13) {
            goToSearch()
         }
      }
      document.addEventListener('keyup', enterEvent)
      return () => {
         document.removeEventListener('keyup', enterEvent)
      }
   }, [keyword, goToSearch])
   return (
      <div className="movie-search">
         <Input
            type='text'
            placeholder='Enter keyword'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
         />
         <Button className='small' onClick={goToSearch}>Search</Button>
      </div>
   )
}

export default MovieGrid