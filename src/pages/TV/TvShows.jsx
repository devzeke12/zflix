import React from 'react'
import TvCarousel from './TvCarousel'
import PopularTV from './PopularTV'
import AiringToday from './AiringToday'
import TopRated from './TopRated'
import OnTheAir from './OnTheAir'

const TvShows = () => {
  return (
    <div>
      <div>
      <TvCarousel />
      </div>
      <div className='px-[40px] py-[20px]'>
      <PopularTV />
      <AiringToday />
      <TopRated />
      <OnTheAir />
      </div>
    </div>
  )
}

export default TvShows