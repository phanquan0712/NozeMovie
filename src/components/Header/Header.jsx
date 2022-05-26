import React, { useRef, useEffect } from 'react'
import './Header.scss';
import logo from '../../assets/arrow-play-logo-vector_23987-136.webp'
import { Link, useLocation } from 'react-router-dom';
const headerNavigation = [
   {
      display: 'Home',
      path: '/'
   },
   {
      display: 'Movies',
      path: '/movie',
   },
   {
      display: 'TV Series',
      path: '/tv',
   }
]

const Header = (props) => {
   const { pathname } = useLocation();
   const headerRef = useRef(null)
   const active  = headerNavigation.findIndex(item => item.path === pathname);


   useEffect(() => {
      const shrinkHeader = () => {
         if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            headerRef.current.classList.add('shrink');
         }
         else {
            headerRef.current.classList.remove('shrink');
         }
      }
      window.addEventListener('scroll', shrinkHeader);
      return () => {
         window.removeEventListener('scroll', shrinkHeader);
      }
   }, [])


   return (
      <div className='header' ref={headerRef}>
         <div className="header__wrap container">
            <div className="logo">
               <img src={logo} alt="" />
               <Link to='/'>NozeMovie</Link>
            </div>
            <ul className="header__navigation">
               {
                  headerNavigation.map((item, index) => (
                     <li key={index} className={`${index === active ? 'active' : ''}`}>
                        <Link to={item.path}>
                           {item.display}
                        </Link>
                     </li>
                  ))
               }
            </ul>
         </div>
      </div>
   )
}

export default Header