import React from 'react'
import TrendingAll from './TrendingAll'
import TrendingMovies from './TrendimgMovies'
import TrendingTv from './TrendingTvShows'
import TrendingPeople from './TrendingPeople'

const Trending = () => {
  return (
    <div className='px-[40px] py-[20px]'> 
      <TrendingAll />
      <TrendingMovies />
      <TrendingTv />
      <TrendingPeople />
    </div>
  )
}

export default Trending