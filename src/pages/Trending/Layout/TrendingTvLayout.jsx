import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom';
import { FetchContext } from '../../../db/FetchContext';
import Error from '../../../components/Error';
import TrendingNavigation from '../../../components/TrendingNavigation';
import TvToday from '../pages/TvToday';
import TvWeek from '../pages/TvWeek';


const navs = [
    {
        title: 'Trending Tv Today',
        path: '/trending/tv/today/1'
    },
    {
        title: 'Trending Tv Week',
        path: '/trending/tv/week/1'
    },
]

const TrendingTvLayout = () => {
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
    <Route path='today/:page' element={<TvToday />} />
    <Route path='week/:page' element={<TvWeek />} />
  </Routes>
    </div>
  )
}

export default TrendingTvLayout