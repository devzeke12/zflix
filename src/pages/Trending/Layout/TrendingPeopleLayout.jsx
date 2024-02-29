import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom';
import { FetchContext } from '../../../db/FetchContext';
import Error from '../../../components/Error';
import TrendingNavigation from '../../../components/TrendingNavigation';
import PeopleToday from '../pages/PeopleToday';
import PeopleWeek from '../pages/PeopleWeek';


const navs = [
    {
        title: 'Trending People Today',
        path: '/trending/people/today/1'
    },
    {
        title: 'Trending People Week',
        path: '/trending/people/week/1'
    },
]

const TrendingPeopleLayout = () => {
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
    <Route path='today/:page' element={<PeopleToday />} />
    <Route path='week/:page' element={<PeopleWeek />} />
  </Routes>
    </div>
  )
}

export default TrendingPeopleLayout