import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom';
import { FetchContext } from '../../db/FetchContext';
import Error from '../../components/Error';
import TvNavigation from '../../components/Tv/TvNavigation'
import TrendingNavigation from '../../components/TrendingNavigation';
import Movies from './pages/Movies';
import Tv from './pages/Tv';


const DiscoverLayout = () => {
    const navs = [
        {
            title: 'Discover Movies',
            path: '/discover/movies/1'
        },
        {
            title: 'Discover Tv',
            path: '/discover/tv/1'
        },
    ]
  const {  error, isLoading } = useContext(FetchContext)
  if (isLoading) {
    return <div>Loading...</div>; // Replace with your loading component
  }

  if (error) {
    return <Error />; // Replace with your error component
  }
  return (
    <div>
      <TrendingNavigation navs={navs} />
    <Routes>
    <Route path='movies/:page' element={<Movies />} />
    <Route path='tv/:page' element={<Tv />} />
  </Routes>
    </div>
  )
}

export default DiscoverLayout