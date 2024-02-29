import { createContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { genres } from './Genres';


export const FetchContext = createContext();

export const FetchContextProvider = (props) => {
  
  const API_KEY = '87636e588ce5feff057621a8b2d7dbe1';


  const [popularMovies, setPopularMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const getPopularMovies = () => {
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(data => setPopularMovies(data))  
      console.log('ppppp', popularMovies)  
    }
    const [nowPlaying, setNowPlaying] = useState([])
    const getNowPlayingMovies = () => {
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => setNowPlaying(data.results))    
      }

      const [topRated, setTopRated] = useState([])
      const getTopRated = () => {
          fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`)
          .then(response => response.json())
          .then(data => setTopRated(data.results))    
        }
      
        const [upComing, setUpComing] = useState([])
    const getUpComing = () => {
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => setUpComing(data.results))    
      }

    
    const [popularTv, setPopularTv] = useState([])
    const getPopularTv = () => {
      fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(data => setPopularTv(data.results))  
  }

    const [trending, setTrending] = useState([]);
    const getTrending = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`);
      const data = await response.json();
      setTrending(data.results);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      console.log('error is', error)
    }
  };
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

  const [trendingTv, setTrendingTv] = useState([]);
    const getTrendingTv = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}`);
      const data = await response.json();
      setTrendingTv(data.results);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      console.log('error is', error)
    }
  };

  const [popularPeople, setPopularPeople] = useState([])
  const getPopularPeople = () => {
    fetch(`https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => setPopularPeople(data.results))
    console.log('peoppppp', popularPeople)

}

  const getGenreNamesByIds = (genreIds) => {
    return genreIds.map((genreId) => {
      const genre = genres.find((g) => g.id === genreId);
      return genre ? genre.name : "Unknown Genre";
    });
  };

  const trendingWithGenres = trending.map(movie => ({
    ...movie,
    genreNames: getGenreNamesByIds(movie.genre_ids),
  }));

  const trendingMovieWithGenres = trendingMovie.map(movie => ({
    ...movie,
    genreNames: getGenreNamesByIds(movie.genre_ids),
  }));

  const trendingTvWithGenres = trendingTv.map(movie => ({
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

  
    useEffect(() => {
        getPopularMovies()
        getPopularTv()
        getTrending();
        getPopularPeople();
        getTrendingMovie();
        getTrendingTv();
    }, [])

  const contextValue = {
    popularMovies,
    trending: trendingWithGenres,
    isLoading,
    error,
    popularTv, 
    popularPeople, 
    details,
    getDetails,
    trendingMovie: trendingMovieWithGenres,
    getNowPlayingMovies,
    nowPlaying, topRated, getTopRated, upComing, getUpComing, trendingTv: trendingTvWithGenres
  };

  return (
    <FetchContext.Provider value={contextValue}>
      {props.children}
    </FetchContext.Provider>
  );
};
