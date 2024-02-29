import React, { useContext,  useState } from 'react'
import { FetchContext } from '../../db/FetchContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { IoChevronForwardCircleOutline } from "react-icons/io5";

const SPRING_OPTIONS = {
    type: "spring",
    mass: 3,
    stiffness: 400,
    damping: 50,
  };

const MoviesCarousel = () => {
  const { trendingMovie, isLoading, error } = useContext(FetchContext);
  const [imgIndex, setImgIndex] = useState(0);
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>; // Replace with your loading component
  }

  if (error) {
    return <div>Error: {error}</div>; // Replace with your error component
  }

  const handleNextClick = () => {
    setImgIndex(imgIndex + 1) 
  }
  const handlePrevClick = () => {
    setImgIndex(imgIndex - 1)
  }

  const changeImage = (newIndex) => {
    setImgIndex(newIndex);
  };

  
  const movieGenres = trendingMovie.map(movie => movie.genreNames)

  const movieGenre = movieGenres[imgIndex]

  console.log('llll', trendingMovie.length, 'imgindex:', imgIndex)


  return (
    <div className="relative overflow-hidden w-full h-auto">
        {isLoading ? '' :
        <div className='absolute flex flex-col justify-center w-full h-full z-20'>
        <div className="flex flex-row justify-around" >
    <div className="w-1/2 flex flex-col gap-5">
  {trendingMovie[imgIndex] && <p className="font-bold text-4xl">{trendingMovie[imgIndex].name}{trendingMovie[imgIndex].title}</p>}
  <div className="flex flex-row gap-3">
    <span className="font-bold text-xl"><span className="bg-blue-500 rounded-3xl p-3 py-1 mr-2">TMDB</span>{Math.floor(trendingMovie[imgIndex].vote_average)} </span>
    <span className="flex flex-row flex-wrap gap-3">{movieGenre.map((moviegen, index) => <h1 className="bg-gray-500 rounded-3xl p-3 py-1">{moviegen}</h1>)}</span>
  </div>
  <h1>{trendingMovie[imgIndex].overview}</h1>
  <button className="bg-blue-500 text-white text-left w-fit px-5 py-2 rounded-2xl" 
   onClick={() => {
  if (trendingMovie[imgIndex] && typeof trendingMovie[imgIndex].media_type === 'string') {
    navigate(`/${trendingMovie[imgIndex].media_type === "movie" ? 'movie' : 'tv'}/${encodeURIComponent(trendingMovie[imgIndex].id)}`);
  }
}}>More Details</button>

    </div>
    <div>
    {trendingMovie[imgIndex] && (
  <img
    src={`https://image.tmdb.org/t/p/w500${trendingMovie[imgIndex].poster_path}`}
    alt='banner'
    className="w-[200px] h-auto shadow-transparent shadow-2xl"
  />
)}

    </div>
</div>
<div className=' z-20 text-5xl flex flex-row justify-end gap-5 mx-5 '>
<button onClick={handlePrevClick} className={`${imgIndex === 0 ?  'hidden' : 'pointer-events-auto cursor-pointer'}`}><IoChevronBackCircleOutline /></button>
    <button onClick={handleNextClick} className={`${imgIndex === trendingMovie.length - 1 ?  'invisible' : 'pointer-events-auto cursor-pointer'}`}><IoChevronForwardCircleOutline /></button>
</div>
<div className="pt-20 flex justify-center gap-2">
        {trendingMovie.map((_, idx) => (
          <button
            key={idx}
            onClick={() => changeImage(idx)}
            className={`h-3 w-3 rounded-full transition-colors ${
              idx === imgIndex ? "bg-neutral-50" : "bg-neutral-500"
            }`}
          />
        ))}
      </div>

</div>}
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        initial={{
          opacity: 0.2,
        }}
        
        animate={{
          translateX: `-${imgIndex * 100}%`,
          transition: { opacity: 1 },
        }}
        transition={SPRING_OPTIONS}
        className="flex cursor-grab relative w-full items-center active:cursor-grabbing"
      >
        {trendingMovie.map((item, idx) => {
          const backgroundImageUrl = item.backdrop_path
            ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
            : 'https://via.placeholder.com/800';
          return (
            <motion.div
              key={idx}
              style={{
                backgroundImage: `url(${backgroundImageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              
              transition={SPRING_OPTIONS}
              className="w-full h-screen aspect-video"
            >
            </motion.div>
          );
        })}
      </motion.div>
    
    </div>
  )
}

export default MoviesCarousel