import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Pagination from '../../../components/Pagination';
import TvCard from '../../../components/Tv/TvCard';
import CardToggleBtn from '../../../components/CardToggleBtn';
import { genres } from '../../../db/Genres';
import TvDetailCard from '../../../components/Tv/TvDetailCard';
import TvLongCard from '../../../components/Tv/TvLongCard';





const OnAir = () => {
  const API_KEY = '87636e588ce5feff057621a8b2d7dbe1';
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState()
  const navigate = useNavigate()
  const { page } = useParams();
  const pageNumber = decodeURIComponent(page);
  console.log('page', pageNumber)

  const getPopular = (pageNumber) => {
    setLoading(true);
    fetch(`https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=${pageNumber}&api_key=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setPopular(data.results);
        setTotalPages(data.total_pages)
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }

  const handlePageClick = (newPage) => {
    navigate(`/tvshows/on-the-air/${encodeURIComponent(newPage)}`);
    console.log(`Navigating to page ${newPage}`);
  };

  const getGenreById = (genreId) => {
    const foundGenre = genres.find(genre => genre.id === genreId);
    return foundGenre ? foundGenre.name : 'Unknown Genre';
  };

  useEffect(() => {
    getPopular(pageNumber);
  }, [pageNumber]);

  const [ layout, setLayout ] = useState('card')



  return (
    <div>
      <div className='flex justify-between'>
        <h1>Airing Today</h1>
        <CardToggleBtn setLayout={setLayout} />
      </div>
      <div className='flex flex-row flex-wrap justify-center gap-5'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          popular.map((movie, index) => layout === 'card' ? (
            <TvCard key={index} date={movie.first_air_date} overview={movie.overview} title={movie.name} id={movie.id} poster_path={movie.poster_path} rating={movie.vote_average} genre={getGenreById(movie.genre_ids[0])} />
          ) : layout === 'detailed' ? (
            <TvDetailCard key={index} date={movie.release_date} overview={movie.overview} title={movie.name} id={movie.id} poster_path={movie.poster_path} rating={movie.vote_average} genre={getGenreById(movie.genre_ids[0])} />
          ) : layout === 'long' ? (
            <TvLongCard key={index} date={movie.release_date} overview={movie.overview} title={movie.name} id={movie.id} poster_path={movie.poster_path} rating={movie.vote_average} genre={getGenreById(movie.genre_ids[0])} />
          ) : (
            <div>error</div>
          ))
        )}
      </div>
          <Pagination pageNumber={pageNumber} handlePageClick={handlePageClick} totalPages={totalPages} />
   </div>
  );
}

export default OnAir;
