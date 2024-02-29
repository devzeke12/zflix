import React, { useContext, useEffect } from 'react'
import { FetchContext } from '../../db/FetchContext'
import { useNavigate } from 'react-router-dom';
import MovieCard from '../../components/movie/MovieCard';

const UpcomingMovie = () => {
  const { upComing, getUpComing } = useContext(FetchContext);
  const navigate = useNavigate();

  useEffect(() => {
      getUpComing();
    }, []);

  return (
    <div className='w-full h-screen flex flex-col gap-10' >
        <div>
            <h1 className='text-3xl font-bold'>UpComing</h1>
            <button className='bg-[#33333A] px-3 py-1 rounded-3xl my-3' onClick={() => navigate('/movies/upcoming/1')}>View More</button>
        </div>
    <div className='overflow-x-scroll overflow-y-hidden dmovies grid grid-rows-[50vh] grid-cols-auto whitespace-wrap w-full relative h-full max-w-screen-xl mx-auto'>
      <div className="flex h-max">
        {upComing.map((movie, index) => <MovieCard key={index} title={movie.title} poster_path={movie.poster_path} id={movie.id} />)}
      </div>
    </div>
    </div>
  )
}

export default UpcomingMovie