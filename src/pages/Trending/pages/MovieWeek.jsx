import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Pagination from '../../../components/Pagination';
import { genres } from '../../../db/Genres';
import TvCard from '../../../components/Tv/TvCard';
import TvDetailCard from '../../../components/Tv/TvDetailCard';
import TvLongCard from '../../../components/Tv/TvLongCard';
import CardToggleBtn from '../../../components/CardToggleBtn';

const MovieWeek = () => {
  const API_KEY = '87636e588ce5feff057621a8b2d7dbe1';
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const { page } = useParams();
  const pageNumber = decodeURIComponent(page);

  const getTvs = (pageNumber) => {
    setLoading(true);
    fetch(`https://api.themoviedb.org/3/trending/movie/week?language=en-US&page=${pageNumber}&api_key=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setTrending(data.results);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }

  const handlePageClick = (newPage) => {
    navigate(`/trending/movie/week/${encodeURIComponent(newPage)}`);
    console.log(`Navigating to page ${newPage}`);
  };

  useEffect(() => {
    getTvs(pageNumber);
  }, [pageNumber]);

  const getGenreById = (genreId) => {
    const foundGenre = genres.find(genre => genre.id === genreId);
    return foundGenre ? foundGenre.name : 'Unknown Genre';
  };

    const [ layout, setLayout ] = useState('card')


  return (
    <div>
      <div className='flex justify-between'>
        <h1>AllWeek Today</h1>
        <CardToggleBtn setLayout={setLayout} />
      </div>
      <div className='flex flex-row flex-wrap justify-center gap-5'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          trending.map((movie, index) => layout === 'card' ? (
            <TvCard key={index} date={movie.first_air_date} overview={movie.overview} title={movie.title} id={movie.id} poster_path={movie.poster_path} rating={movie.vote_average} name={movie.name} genre={getGenreById(movie.genre_ids[0])} />
          ) : layout === 'detailed' ? (
            <TvDetailCard key={index} date={movie.release_date} overview={movie.overview} title={movie.title} id={movie.id} poster_path={movie.poster_path} rating={movie.vote_average} name={movie.name} genre={getGenreById(movie.genre_ids[0])} />
          ) : layout === 'long' ? (
            <TvLongCard key={index} date={movie.release_date} overview={movie.overview} title={movie.title} id={movie.id} poster_path={movie.poster_path} rating={movie.vote_average} name={movie.name} genre={getGenreById(movie.genre_ids[0])} />
          ) : (
            <div>error</div>
          ) )
        )}
      </div>
          <Pagination pageNumber={pageNumber} handlePageClick={handlePageClick} totalPages={300} />
   </div>
  );
}

export default MovieWeek;
