import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom';
import { FetchContext } from '../../../db/FetchContext';
import Error from '../../../components/Error';
import TrendingNavigation from '../../../components/TrendingNavigation';
import AllToday from '../pages/AllToday';
import AllWeek from '../pages/AllWeek';


const navs = [
    {
        title: 'Trending All Today',
        path: '/trending/all/today/1'
    },
    {
        title: 'Trending All Week',
        path: '/trending/all/week/1'
    },
]

const TrendingLayout = () => {
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
    <Route path='today/:page' element={<AllToday />} />
    <Route path='week/:page' element={<AllWeek />} />
  </Routes>
    </div>
  )
}

export default TrendingLayout