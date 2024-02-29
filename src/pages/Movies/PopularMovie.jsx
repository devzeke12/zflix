import React, { useEffect, useState } from 'react';
import MovieCard from '../../components/movie/MovieCard';
import { useNavigate } from 'react-router-dom';

const PopularMovie = () => {
  const navigate = useNavigate();
  const API_KEY = '87636e588ce5feff057621a8b2d7dbe1';
  const [popular, setPopular] = useState([]);
  const getPopular = () => {
          fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
          .then(response => response.json())
          .then(data => setPopular(data.results))    
        }
        useEffect(() => {
            getPopular()
        }, [])
    
  return (
    <div className='w-full h-screen flex flex-col gap-10 font-serif' >
        <div>
            <h1 className='text-3xl font-bold'>Popular Movies</h1>
            <button className='bg-[#33333A] px-3 py-1 rounded-3xl my-3' onClick={() => navigate('/movies/popular/1')}>View More</button>
        </div>
    <div className='overflow-x-scroll overflow-y-hidden dmovies grid grid-rows-[50vh] grid-cols-auto whitespace-wrap w-full relative h-full max-w-screen-xl mx-auto'>
      <div className="flex h-max">
        {popular.map((movie, index) => <MovieCard key={index} title={movie.title} poster_path={movie.poster_path} id={movie.id} />)}
      </div>
    </div>
    </div>
  );
};

export default PopularMovie;
