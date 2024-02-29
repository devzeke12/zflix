import React, {  useEffect, useState } from 'react';
import TvCard from '../../components/Tv/TvCard';
import { useNavigate } from 'react-router-dom';

const TopRated = () => {
    const navigate = useNavigate()
    const API_KEY = '87636e588ce5feff057621a8b2d7dbe1';
  const [rated, setRated] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRated = () => {
    setLoading(true);
    fetch(`https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&api_key=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setRated(data.results);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }

  useEffect(() => {
    getRated();
  }, []);
  return (
    <div className='w-full h-screen flex flex-col gap-10' >
        <div>
            <h1 className='text-3xl font-bold'>Top Rated</h1>
            <button className='bg-[#33333A] px-3 py-1 rounded-3xl my-3' onClick={() => navigate('/tvshows/top-rated/1')}>View More</button>
        </div>
        <div className='overflow-x-scroll overflow-y-hidden dmovies grid grid-rows-[50vh] grid-cols-auto whitespace-wrap w-full relative h-full max-w-screen-xl mx-auto'>
      <div className="flex h-max">
        {rated.map((tvshow, index) => <TvCard key={index} poster_path={tvshow.poster_path} title={tvshow.title} original_name={tvshow.original_name} id={tvshow.id} />)}
      </div>
    </div>
    </div>
  );
};

export default TopRated;
