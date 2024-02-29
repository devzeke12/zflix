import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { FetchContext } from '../../db/FetchContext';

const TvDetails = () => {
  const { id } = useParams();
  const ID = decodeURIComponent(id);
  const { details, isLoading, error, getDetails } = useContext(FetchContext);
  const type = 'tv'

  useEffect(() => {
    getDetails(ID, type);
    console.log(details)
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Replace with your loading component
  }

  if (error) {
    return <div>Error: {error}</div>; // Replace with your error component
  }

  return (
    <div className='text-white'>
      <h1>{details.original_name}</h1>
    </div>
  )
}

export default TvDetails