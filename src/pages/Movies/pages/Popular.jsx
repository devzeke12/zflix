import React, { useEffect, useState } from 'react';
import MovieCard from '../../../components/movie/MovieCard';
import { useNavigate, useParams } from 'react-router-dom';
import Pagination from '../../../components/Pagination';
import MovieDetailCard from '../../../components/movie/MovieDetailCard';
import { genres } from '../../../db/Genres';
import MovieLongCard from '../../../components/movie/MovieLongCard';

const Popular = () => {
  const API_KEY = '87636e588ce5feff057621a8b2d7dbe1';
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState()
  const navigate = useNavigate()
  const { page } = useParams();
  const pageNumber = decodeURIComponent(page);

  const getPopular = (pageNumber) => {
    setLoading(true);
    fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pageNumber}&api_key=${API_KEY}`)
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
    navigate(`/movies/popular/${encodeURIComponent(newPage)}`);
    console.log(`Navigating to page ${newPage}`);
  };

  useEffect(() => {
    getPopular(pageNumber);
  }, [pageNumber]);

  const getGenreById = (genreId) => {
    const foundGenre = genres.find(genre => genre.id === genreId);
    return foundGenre ? foundGenre.name : 'Unknown Genre';
  };

    const [ layout, setLayout ] = useState('card')


  return (
    <div>
      <div className='flex justify-between'>
        <h1>Popular</h1>
        <div className='flex justify-between gap-10'>
          <button onClick={() => setLayout('card')}>g</button>
          <button onClick={() => setLayout('detailed')}>gg</button>
          <button onClick={() => setLayout('long')}>ggg</button>
        </div>
      </div>
      <div className='flex flex-row flex-wrap justify-center gap-5'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          popular.map((movie, index) => layout === 'card' ? (
            <MovieCard key={index} date={movie.release_date} overview={movie.overview} title={movie.title} id={movie.id} poster_path={movie.poster_path} rating={movie.vote_average} genre={getGenreById(movie.genre_ids[0])} />
          ) : layout === 'detailed' ? (
            <MovieDetailCard key={index} date={movie.release_date} overview={movie.overview} title={movie.title} id={movie.id} poster_path={movie.poster_path} rating={movie.vote_average} genre={getGenreById(movie.genre_ids[0])} />
          ) : layout === 'long' ? (
            <MovieLongCard key={index} date={movie.release_date} overview={movie.overview} title={movie.title} id={movie.id} poster_path={movie.poster_path} rating={movie.vote_average} genre={getGenreById(movie.genre_ids[0])} />
          ) : (
            <div>error</div>
          ) )
        )}
      </div>
          <Pagination pageNumber={pageNumber} handlePageClick={handlePageClick} totalPages={totalPages} />
   </div>
  );
}

export default Popular;
