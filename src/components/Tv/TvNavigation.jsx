import React from 'react'
import { useNavigate } from 'react-router-dom'

const TvNavigation = () => {
    const navigate = useNavigate()
  return (
    <div className='flex flex-row justify-around h-20 border-b items-end'>
        <button onClick={() => navigate('/tvshows/popular/1')}>Popular Tv Shows</button>
        <button onClick={() => navigate('/tvshows/airing/1')}>Airing Today - Tv Shows</button>
        <button onClick={() => navigate('/tvshows/top-rated/1')}>Top Rated - Tv Shows</button>
        <button onClick={() => navigate('/tvshows/on-the-air/1')}>On The Air - Tv Shows</button>
    </div>
  )
}

export default TvNavigation