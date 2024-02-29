import React, { useContext } from 'react';
import MoviesCarusel from './MoviesCarousel';
import PopularMovie from './PopularMovie';
import { MovieContextProvider } from '../../db/MovieContext';
import NowPlaying from './NowPlaying';
import UpcomingMovie from './UpcomingMovie';
import TopRated from './TopRated';
import Error from '../../components/Error';
import { FetchContext } from '../../db/FetchContext';

const Movies = () => {
  const { error, isLoading } = useContext(FetchContext)
  if (isLoading) {
    return <div>Loading...</div>; // Replace with your loading component
  }

  if (error) {
    return <Error />; // Replace with your error component
  }
  return (
    <MovieContextProvider>
      <div className='h-auto'>
        <div>
        <MoviesCarusel />

        </div>
        <div className='px-[40px] py-[20px]'>
        <PopularMovie />
        <TopRated />
        <NowPlaying />
        <UpcomingMovie /></div>
      </div>
    </MovieContextProvider>
  );
};

export default Movies;
