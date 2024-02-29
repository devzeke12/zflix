import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Pagination from '../../../components/Pagination';
import { genres } from '../../../db/Genres';
import Sort from '../../../components/Sort';
import TvCard from '../../../components/Tv/TvCard';
import TvDetailCard from '../../../components/Tv/TvDetailCard';
import TvLongCard from '../../../components/Tv/TvLongCard';

const Tv = () => {
  const API_KEY = '87636e588ce5feff057621a8b2d7dbe1';
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState();
  const navigate = useNavigate();
  const { page } = useParams();
  const pageNumber = decodeURIComponent(page);
  const [sort, setSort] = useState('popularity.desc');

  const getMovies = (pageNumber) => {
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=${sort}&api_key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  const handlePageClick = (newPage) => {
    navigate(`/discover/tv/${encodeURIComponent(newPage)}`);
    console.log(`Navigating to page ${newPage}`);
  };

  useEffect(() => {
    getMovies(pageNumber);
  }, [pageNumber, sort]); // Include sort as a dependency

  const getGenreById = (genreId) => {
    const foundGenre = genres.find((genre) => genre.id === genreId);
    return foundGenre ? foundGenre.name : 'Unknown Genre';
  };

  const [layout, setLayout] = useState('card');

  return (
    <div>
      <div className='flex justify-between'>
        <h1>Popular</h1>
        <div className='flex justify-between gap-10'>
        <Sort sort={sort} setSort={setSort} />
          <button onClick={() => setLayout('card')}>g</button>
          <button onClick={() => setLayout('detailed')}>gg</button>
          <button onClick={() => setLayout('long')}>ggg</button>
        </div>
      </div>
      <div className='flex flex-row flex-wrap justify-center gap-5'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          movies.map((movie, index) =>
            layout === 'card' ? (
              <TvCard
                key={index}
                date={movie.release_date}
                overview={movie.overview}
                title={movie.title}
                id={movie.id}
                poster_path={movie.poster_path}
                rating={movie.vote_average}
                genre={getGenreById(movie.genre_ids[0])}
              />
            ) : layout === 'detailed' ? (
              <TvDetailCard
                key={index}
                date={movie.release_date}
                overview={movie.overview}
                title={movie.title}
                id={movie.id}
                poster_path={movie.poster_path}
                rating={movie.vote_average}
                genre={getGenreById(movie.genre_ids[0])}
              />
            ) : layout === 'long' ? (
              <TvLongCard
                key={index}
                date={movie.release_date}
                overview={movie.overview}
                title={movie.title}
                id={movie.id}
                poster_path={movie.poster_path}
                rating={movie.vote_average}
                genre={getGenreById(movie.genre_ids[0])}
              />
            ) : (
              <div>error</div>
            )
          )
        )}
      </div>
      <Pagination pageNumber={pageNumber} handlePageClick={handlePageClick} totalPages={totalPages} />
    </div>
  );
};

export default Tv;
