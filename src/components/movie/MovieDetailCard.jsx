import React from 'react'
import { useNavigate } from 'react-router-dom'

const MovieDetailCard = ({ poster_path, title, id, overview, date, rating, genre}) => {
  const navigate = useNavigate()
  return (
    <div className='w-[500px] bg-[#151516] cursor-pointer relative movie h-[300px] mr-4 rounded-2xl text-center flex flex-row' onClick={() => navigate(`/movie/${encodeURIComponent(id)}`)}>
            <div className='w-2/5 h-full relative'>
                <div className='absolute bottom-0 text-center w-full py-2' style={{ backdropFilter: 'blur(100px)' }} >
            <h1 className='text-lg font-semibold'>{title}</h1>
                </div>
            <img className='w-full h-full object-cover rounded-3xl' src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
            </div>
            <div className='h-full w-3/5 flex flex-col justify-between p-3 text-left'>
                <div><span>Movie.</span><span>{date}</span><span>{rating}</span></div>
                <div><h1>{overview}</h1></div>
                <div>{genre}</div>
                
            </div>
          </div>
  )
}

export default MovieDetailCard