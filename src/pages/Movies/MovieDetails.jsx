import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FetchContext } from '../../db/FetchContext';
import { Routes, Route } from 'react-router-dom';
import Cast from './Details/Cast';
import TrendingNavigation from '../../components/TrendingNavigation';
import DetailsNavigation from '../../components/DetailsNavigation';
import Overview from './Details/Overview';
import Videos from './Details/Videos';
import Photos from './Details/Photos';



const MovieDetails = () => {
  const { id } = useParams();
  const ID = decodeURIComponent(id);
  const { details, isLoading, error, getDetails } = useContext(FetchContext);
  const { backdrop_path, poster_path, title, release_date, tagline, vote_average, runtime, genres } = details;
  const type = 'movie'

  useEffect(() => { 
    document.title = title ? `ZFLIX | ${title}` : 'ZFLIX' ;
    getDetails(ID, type);
  }, [ID, type]);

  if (isLoading) {
    return <div>Loading...</div>; // Replace with your loading component
  }

  if (error) {
    return <div>Error: {error}</div>; // Replace with your error component
  }

  const getDateYear = (dateString) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  const convertMinutesToHours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} h ${remainingMinutes} m`;
  };


  const backgroundImageUrl = backdrop_path
            ? `https://image.tmdb.org/t/p/original${backdrop_path}`
            : 'https://via.placeholder.com/800';

  return (
    <div>
    <div className='text-white flex bg-no-repeat bg-fixed bg-cover h-screen items-end px-[100px]' style={{backgroundImage: `url(${backgroundImageUrl})`
    }}>
      <div className='flex flex-row gap-20'>
        <div className='relative w-[200px] h-[300px]'>
        <img src={ `https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
        </div>
        <div className='flex flex-col gap-5'>
          <h1 className='text-4xl font-extrabold'>{title}({getDateYear(release_date)})</h1>
          <h1 className='text-lg font-semibold italic'>{tagline}</h1>
          <div>
            <span className='bg-red-500 px-5 py-1 rounded-3xl'>TMDB. {vote_average}</span>
            <span className='bg-red-500 px-5 py-1 rounded-3xl'>{release_date} . {convertMinutesToHours(runtime)}</span>
          </div>
          <div>{isLoading === true ? 'LLL' : genres.map((genre, index) => <span className='bg-red-500 px-5 py-2 rounded-xl' key={index}>{genre.name}</span>)}</div>
        </div>
      </div>
    </div>
    <DetailsNavigation id={id} />
    <Routes>
    <Route path='' element={<Overview details={details} />} />
    <Route path='cast' element={<Cast />} />
    <Route path='videos' element={<Videos />} />
    <Route path='photos' element={<Photos />} />
  </Routes>

    </div>
  );
};

export default MovieDetails;
