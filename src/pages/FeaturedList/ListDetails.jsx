import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import { FetchContext } from '../../db/FetchContext';

const ListDetails = () => {
    const { id } = useParams();
  const ID = decodeURIComponent(id);
  const { details, isLoading, error, getDetails } = useContext(FetchContext);
  const type = 'list'

  useEffect(() => {
    getDetails(ID, type);
  }, [ID, getDetails]);

  if (isLoading) {
    return <div>Loading...</div>; // Replace with your loading component
  }

  if (error) {
    return <div>Error: {error}</div>; // Replace with your error component
  }
  return (
    <div>
        {details.name}
    </div>
  )
}

export default ListDetails