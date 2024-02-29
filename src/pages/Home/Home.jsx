import React from 'react'
import { useContext } from 'react'
import { FetchContext } from '../../db/FetchContext'
import Carousel from './Carousel'
import PopularMovie from '../Movies/PopularMovie'
import PopularTV from '../TV/PopularTV'
import PopularPeople from './PopularPeople'
import FeaturedList from './FeaturedList'
import Error from '../../components/Error'


const Home = () => {
    const { isLoading, popularTv, popularPeople, trending, error, getDetails } = useContext(FetchContext)
    if (isLoading) {
      return <div>Loading...</div>; // Replace with your loading component
    }
  
    if (error) {
      return <Error />; // Replace with your error component
    }  
  return (
    <div className='relative flex flex-col home font-sans text-white gap-20'>
      <Carousel trending={trending} error={error} isLoading={isLoading} getDetails={getDetails} />
      <div className='px-10'>
      <PopularMovie />
      <PopularTV />
      <FeaturedList />
      <PopularPeople people={popularPeople}/>
      </div>
    </div>
  )
}

export default Home