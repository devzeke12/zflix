import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PeopleCard from '../../../components/PeopleCard';


const Cast = () => {
  const { id } = useParams();
  const ID = decodeURIComponent(id);
 const API_KEY = '87636e588ce5feff057621a8b2d7dbe1';
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCast = (ID) => {
    setIsLoading(true);
    fetch(`https://api.themoviedb.org/3/movie/${ID}/credits?language=en-US&api_key=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setCast(data.cast);
        console.log('id', ID, 'type', cast)
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getCast(ID);
  }, []);
  return (
    <div className="flex flex-wrap justify-between gap-5 px-5 py-5 h-max">
        {cast.map((item, index) => <PeopleCard key={index} profile_path={item.profile_path} id={item.id} name={item.name} />)}
      </div>
  )
}

export default Cast