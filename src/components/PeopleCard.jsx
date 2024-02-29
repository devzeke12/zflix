import React from 'react'
import { useNavigate } from 'react-router-dom';

const PeopleCard = ({ id, profile_path, name }) => {
    const navigate = useNavigate()
  return (
    <div className='w-[300px] bg-[#151516] cursor-pointer movie h-fit mr-4 rounded-2xl text-center flex flex-col' 
          onClick={() => {
            navigate(`/person/${encodeURIComponent(id)}`);
          
        }}>
            <div class="group relative">
          <img src={`${ profile_path ? `https://image.tmdb.org/t/p/w500${profile_path}` : 'https://via.placeholder.com/800' }`} alt={name} class="w-full h-full" />
          <div class="absolute inset-0 hidden group-hover:flex items-center justify-center bg-black bg-opacity-50">
            <p class="text-white">{name}</p>
          </div>
        </div>
            
    </div>
  )
}

export default PeopleCard;