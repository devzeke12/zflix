import React from 'react'
import { useNavigate } from 'react-router-dom'

const MovieLongCard = ({ poster_path, title, id, overview, date, rating, genre}) => {
  const navigate = useNavigate()
  return (
    <div className='w-fullbg-[#151516] cursor-pointer relative movie h-[200px] mr-4 rounded-2xl justify-start flex flex-row' onClick={() => navigate(`/movie/${encodeURIComponent(id)}`)}>
            <div className='w-2/9 h-full relative'>
            <img className='w-full h-full object-cover rounded-lg' src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
            </div>
            <div className='h-full w-7/9 flex flex-col justify-between p-3 text-left'>
            <h1 className='text-lg font-semibold'>{title}</h1>
                <div><span>Movie.</span><span>{date}</span><span>{rating}</span></div>
                <div><h1>{overview}</h1></div>
                <div>{genre}</div>
                
            </div>
          </div>
  )
}

export default MovieLongCard