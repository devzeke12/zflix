import React, { useContext } from 'react';
import TvCard from '../../components/Tv/TvCard';
import { FetchContext } from '../../db/FetchContext';
import { useNavigate } from 'react-router-dom';

const PopularTV = () => {
  const navigate = useNavigate()
  const { popularTv } = useContext(FetchContext)
  return (
    <div className='w-full h-screen flex flex-col gap-10' >
        <div>
            <h1 className='text-3xl font-bold'>Popular Tv</h1>
            <button className='bg-[#33333A] px-3 py-1 rounded-3xl my-3' onClick={() => navigate('/tvshows/popular/1')}>View More</button>
        </div>
        <div className='overflow-x-scroll overflow-y-hidden dmovies grid grid-rows-[50vh] grid-cols-auto whitespace-wrap w-full relative h-full max-w-screen-xl mx-auto'>
      <div className="flex h-max">
        {popularTv.map((tvshow, index) => <TvCard key={index} poster_path={tvshow.poster_path} title={tvshow.title} original_name={tvshow.original_name} id={tvshow.id} />)}
      </div>
    </div>
    </div>
  );
};

export default PopularTV;
