import { createContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';


export const MovieContext = createContext();

export const MovieContextProvider = (props) => {
  
  const API_KEY = '87636e588ce5feff057621a8b2d7dbe1';

  const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
    { id: 10759, name: "Action & Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 10762, name: "Kids" },
    { id: 9648, name: "Mystery" },
    { id: 10763, name: "News" },
    { id: 10764, name: "Reality" },
    { id: 10765, name: "Sci-Fi & Fantasy" },
    { id: 10766, name: "Soap" },
    { id: 10767, name: "Talk" },
    { id: 10768, name: "War & Politics" },
    { id: 37, name: "Western" }
  ];

  const [popularMovies, setPopularMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const getPopularMovies = () => {
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(data => setPopularMovies(data.results))    
    }

  const [trendingMovie, setTrendingMovie] = useState([]);
    const getTrendingMovie = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`);
      const data = await response.json();
      setTrendingMovie(data.results);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      console.log('error is', error)
    }
  };

  const getGenreNamesByIds = (genreIds) => {
    return genreIds.map((genreId) => {
      const genre = genres.find((g) => g.id === genreId);
      return genre ? genre.name : "Unknown Genre";
    });
  };
  const trendingMovieWithGenres = trendingMovie.map(movie => ({
    ...movie,
    genreNames: getGenreNamesByIds(movie.genre_ids),
  }));

  const [details, setDetails] = useState([]);
  const getDetails = async (ID, type) => {
    try {
      if (!ID || !type) {
        throw new Error('Invalid person ID');
      }

      const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${ID}$?api_key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Person details not found');
      }

      const data = await response.json();
      setDetails(data);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching person details:', error);
    } finally {
      setIsLoading(false);
    }
  };


  const contextValue = { popularMovies, getPopularMovies, trendingMovie: trendingMovieWithGenres, getTrendingMovie, details, getDetails
  };

  return (
    <MovieContext.Provider value={contextValue}>
      {props.children}
    </MovieContext.Provider>
  );
};
