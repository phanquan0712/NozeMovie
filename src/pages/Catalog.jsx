import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import PageHeader from '../components/Page-header/PageHeader'
import { category as cate } from '../api/tmdbApi'
import MovieGrid from '../components/Movie-grid/MovieGrid'
const Catalog = props => {
   const { category } = useParams();
   return (
      <>
         <PageHeader>
            {category === cate.movie ? 'Movies' : 'TV Series'}
         </PageHeader>
         <div className="container">
            <div className="section mb-3">
               <MovieGrid category={category} />
            </div>
         </div>
      </>
   )
}

Catalog.propTypes = {}

export default Catalog