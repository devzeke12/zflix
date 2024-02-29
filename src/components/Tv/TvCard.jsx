import React from 'react'
import { useNavigate } from 'react-router-dom'

const TvCard = ({ poster_path, title, id, original_name }) => {
  const navigate = useNavigate()
  return (
    <div className='w-[300px] bg-[#151516] movie cursor-pointer h-fit mr-4 rounded-2xl text-center flex flex-col' onClick={() => navigate(`/tv/${encodeURIComponent(id)}`)}>
            <div class="group relative">
          <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="Your Image" class="w-full h-auto" />

          <div class="absolute inset-0 hidden group-hover:flex items-center justify-center bg-black bg-opacity-50">
            <p class="text-white">{title ? title : original_name}</p>
          </div>
        </div>
          </div>
  )
}

export default TvCard