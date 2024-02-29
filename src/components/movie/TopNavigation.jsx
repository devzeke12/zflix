import React from 'react'
import { useNavigate } from 'react-router-dom'

const TopNavigation = () => {
    const navigate = useNavigate()
  return (
    <div className='flex flex-row justify-around h-20 border-b items-end'>
        <button onClick={() => navigate('/movies/popular/1')}>Popular Movies</button>
        <button onClick={() => navigate('/movies/now-playing/1')}>Now Playing</button>
        <button onClick={() => navigate('/movies/top-rated/1')}>Top Rated</button>
        <button onClick={() => navigate('/movies/upcoming/1')}>Upcoming</button>
    </div>
  )
}

export default TopNavigation