import React, { useEffect, useState } from 'react';
import TrendingCard from '../../components/TrendingCard';
import { useNavigate } from 'react-router-dom';

const TrendingMovies = () => {
  const [trending, setTrending] = useState([]);
  const API_KEY = '87636e588ce5feff057621a8b2d7dbe1';
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

    const getTrending = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`);
      const data = await response.json();
      setTrending(data.results);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      console.log('error is', error)
    }
  };
  useEffect(() => {
    getTrending();
  }, [])
  if (isLoading) {
    return <div>Loading...</div>; // Replace with your loading component
  }

  if (error) {
    return <div>Error: </div>; // Replace with your error component
  }  
  return (
    <div className='w-full h-screen flex flex-col gap-10' >
        <div>
            <h1 className='text-3xl font-bold'>Trending Movies Today</h1>
            <button className='bg-[#33333A] px-3 py-1 rounded-3xl my-3' onClick={() => navigate('/trending/movie/today/1')}>View More</button>
        </div>
        <div className='overflow-x-scroll overflow-y-hidden dmovies grid grid-rows-[50vh] grid-cols-auto whitespace-wrap w-full relative h-full max-w-screen-xl mx-auto'>
      <div className="flex h-max">
        {trending.map((item, index) => <TrendingCard key={index} poster={item.poster_path} id={item.id} name={item.name} title={item.title} media={item.media_type} />)}
      </div>
    </div>
    </div>
  );
};

export default TrendingMovies;
