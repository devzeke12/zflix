import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom';
import { FetchContext } from '../../db/FetchContext';
import Error from '../../components/Error';
import Airing from './pages/Airing';
import OnAir from './pages/OnAir';
import Popular from './pages/Popular';
import TvNavigation from '../../components/Tv/TvNavigation'
import TopRatedTv from './pages/TopRated';


const TvLayout = () => {
  const {  error, isLoading } = useContext(FetchContext)
  if (isLoading) {
    return <div>Loading...</div>; // Replace with your loading component
  }

  if (error) {
    return <Error />; // Replace with your error component
  }
  return (
    <div>
      <TvNavigation />
    <Routes>
    <Route path='airing/:page' element={<Airing />} />
    <Route path='on-the-air/:page' element={<OnAir />} />
    <Route path='top-rated/:page' element={<TopRatedTv />} />
    <Route path='popular/:page' element={<Popular />} />
  </Routes>
    </div>
  )
}

export default TvLayout