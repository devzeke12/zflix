import React from 'react'
import { useNavigate } from 'react-router-dom'

const MovieCard = ({ poster_path, title, id}) => {
  const navigate = useNavigate()
  return (
    <div className='w-[300px] bg-green-300 cursor-pointer movie h-fit mr-4 rounded-3xl text-center flex flex-col' onClick={() => navigate(`/movie/${encodeURIComponent(id)}`)}>
            <div class="group relative">
          <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="Your Image" class="w-full h-auto" />

          <div class="absolute inset-0 hidden group-hover:flex items-center justify-center bg-black bg-opacity-50">
            <p class="text-white">{title}</p>
          </div>
        </div>
          </div>
  )
}

export default MovieCard