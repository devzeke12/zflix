import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom';
import Popular from './pages/Popular'
import TopRated from './pages/TopRated'
import UpComing from './pages/UpComing'
import TopNavigation from '../../components/movie/TopNavigation'
import NowPlaying from './pages/NowPlaying';
import { FetchContext } from '../../db/FetchContext';
import Error from '../../components/Error';

const MoviesLayout = () => {
  const {  error, isLoading } = useContext(FetchContext)
  if (isLoading) {
    return <div>Loading...</div>; // Replace with your loading component
  }

  if (error) {
    return <Error />; // Replace with your error component
  }
  return (
    <div>
      <TopNavigation />
    <Routes>
    <Route path='popular/:page' element={<Popular />} />
    <Route path='top-rated/:page' element={<TopRated />} />
    <Route path='upcoming/:page' element={<UpComing />} />
    <Route path='now-playing/:page' element={<NowPlaying />} />
  </Routes>
    </div>
  )
}

export default MoviesLayout