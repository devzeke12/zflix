import './App.css';
import { FetchContextProvider } from './db/FetchContext';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import SideBar from './components/SideBar';
import Home from './pages/Home/Home';
import About from './pages/Home/About';
import MovieDetails from './pages/Movies/MovieDetails';
import TvDetails from './pages/TV/TvDetails';
import PeopleDetails from './pages/People/PeopleDetails';
import ListDetails from './pages/FeaturedList/ListDetails';
import Movies from './pages/Movies/Movies';
import Trending from './pages/Trending/Trending';
import MoviesLayout from './pages/Movies/MoviesLayout';
import TvShows from './pages/TV/TvShows';
import TvLayout from './pages/TV/TvLayout';
import TrendingLayout from './pages/Trending/Layout/TrendingAllLayout';
import TrendingMovieLayout from './pages/Trending/Layout/TrendingMovieLayout';
import TrendingTvLayout from './pages/Trending/Layout/TrendingTvLayout';
import TrendingPeopleLayout from './pages/Trending/Layout/TrendingPeopleLayout';
import Discover from './pages/Discover/Discover';
import DiscoverLayout from './pages/Discover/DiscoverLayout';


function App() {
  return (
      <FetchContextProvider>
        <BrowserRouter>
        <div className='flex flex-row relative w-screen bg-[#070708] gap-1'>
          <div className='w-1/5'>
          <SideBar />
          </div>
          <div className='border-[#2f2f53] text-white w-4/5 rounded-xl border relative'>
          <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/trending' element={<Trending />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/tvshows' element={<TvShows />} />
          <Route path='/discover' element={<Discover />} />
          <Route path='/discover/*' element={<DiscoverLayout />} />
          <Route path='/movies/*' element={<MoviesLayout />} />
          <Route path='/tvshows/*' element={<TvLayout />} />
          <Route path='/trending/all/*' element={<TrendingLayout />} />
          <Route path='/trending/movie/*' element={<TrendingMovieLayout />} />
          <Route path='/trending/tv/*' element={<TrendingTvLayout />} />
          <Route path='/trending/people/*' element={<TrendingPeopleLayout />} />
          <Route path='movie/:id/*' element={<MovieDetails />} />
          <Route path='tv/:id' element={<TvDetails />} />
          <Route path='person/:id' element={<PeopleDetails />} />
          <Route path='list/:id' element={<ListDetails />} />
          </Routes>
          </div>
          </div>
        </BrowserRouter>
      </FetchContextProvider>
  );
}

export default App;
