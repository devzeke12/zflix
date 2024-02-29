import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';


const Photos = () => {
    const { id } = useParams();
  const ID = decodeURIComponent(id);
 const API_KEY = '87636e588ce5feff057621a8b2d7dbe1';
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getImages = (ID) => {
    setIsLoading(true);
    fetch(`https://api.themoviedb.org/3/movie/${ID}/images?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setImages(data.backdrops);
        console.log('id')
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getImages(ID);
  }, []);
  return (
    <div className='flex flex-row flex-wrap'>
        {images.map((item, index) => <div>
            <img src={ `https://image.tmdb.org/t/p/w500${item.file_path}`}  alt='image' />
        </div>)}
    </div>
  )
}

export default Photos