import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom';
import { FetchContext } from '../../../db/FetchContext';
import Error from '../../../components/Error';
import TrendingNavigation from '../../../components/TrendingNavigation';
import MovieWeek from '../pages/MovieWeek';
import MovieToday from '../pages/MovieToday';


const navs = [
    {
        title: 'Trending Movie Today',
        path: '/trending/movie/today/1'
    },
    {
        title: 'Trending Movie Week',
        path: '/trending/movie/week/1'
    },
]

const TrendingMovieLayout = () => {
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
    <Route path='today/:page' element={<MovieToday />} />
    <Route path='week/:page' element={<MovieWeek />} />
  </Routes>
    </div>
  )
}

export default TrendingMovieLayout