import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import tmdbApi from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'
const CastList = props => {
   const { category } = useParams();
   const [cats, setCats] = useState([]);

   useEffect(() => {
      const getCredits = async () => {
         const response = await tmdbApi.credits(category, props.id);
         setCats(response.data.cast.slice(0, 5));
      }
      getCredits()
   }, [category, props.id])
   return (
      <div className='casts'>
         {
            cats.map((item, index) => (
               <div key={index} className="casts__item">
                  <div className="casts__item__img" 
                  style={{backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})`}}></div>
                  <p className='casts__item__name'>{item.name}</p>
               </div>
            ))
         }
      </div>
   )
}

CastList.propTypes = {}

export default CastList