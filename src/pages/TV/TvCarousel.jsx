import React, { useContext,  useState } from 'react'
import { FetchContext } from '../../db/FetchContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { IoChevronForwardCircleOutline } from "react-icons/io5";
import Error from '../../components/Error';

const SPRING_OPTIONS = {
    type: "spring",
    mass: 3,
    stiffness: 400,
    damping: 50,
  };

const TvCarousel = () => {
  const { trendingTv, isLoading, error } = useContext(FetchContext);
  const [imgIndex, setImgIndex] = useState(0);
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>; // Replace with your loading component
  }

  if (error) {
    return <Error />; // Replace with your error component
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

  
  const tvGenres = trendingTv.map(movie => movie.genreNames)

  const tvGenre = tvGenres[imgIndex]

  console.log('llll', trendingTv.length, 'imgindex:', imgIndex)


  return (
    <div className="relative overflow-hidden w-full h-auto">
        {isLoading ? '' :
        <div className='absolute flex flex-col justify-center w-full h-full z-20' style={{ backdropFilter: 'blur(5px)' }}>
        <div className="flex flex-row justify-around" >
    <div className="w-1/2 flex flex-col gap-5">
  {trendingTv[imgIndex] && <p className="font-bold text-4xl">{trendingTv[imgIndex].name}{trendingTv[imgIndex].title}</p>}
  <div className="flex flex-row gap-3">
    <span className="font-bold text-xl"><span className="bg-blue-500 rounded-3xl p-3 py-1 mr-2">TMDB</span>{Math.floor(trendingTv[imgIndex].vote_average)} </span>
    <span className="flex flex-row flex-wrap gap-3">{tvGenre.map((moviegen, index) => <h1 className="bg-gray-500 rounded-3xl p-3 py-1">{moviegen}</h1>)}</span>
  </div>
  <h1>{trendingTv[imgIndex].overview}</h1>
  <button className="bg-blue-500 text-white text-left w-fit px-5 py-2 rounded-2xl" 
   onClick={() => {
  if (trendingTv[imgIndex] && typeof trendingTv[imgIndex].media_type === 'string') {
    navigate(`/${trendingTv[imgIndex].media_type === "movie" ? 'movie' : 'tv'}/${encodeURIComponent(trendingTv[imgIndex].id)}`);
  }
}}>More Details</button>

    </div>
    <div>
    {trendingTv[imgIndex] && (
  <img
    src={`https://image.tmdb.org/t/p/w500${trendingTv[imgIndex].poster_path}`}
    alt='banner'
    className="w-[200px] h-auto shadow-transparent shadow-2xl"
  />
)}

    </div>
</div>
<div className=' z-20 text-5xl flex flex-row justify-end gap-5 mx-5 '>
<button onClick={handlePrevClick} className={`${imgIndex === 0 ?  'hidden' : 'pointer-events-auto cursor-pointer'}`}><IoChevronBackCircleOutline /></button>
    <button onClick={handleNextClick} className={`${imgIndex === trendingTv.length - 1 ?  'invisible' : 'pointer-events-auto cursor-pointer'}`}><IoChevronForwardCircleOutline /></button>
</div>
<div className="pt-20 flex justify-center gap-2">
        {trendingTv.map((_, idx) => (
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
        {trendingTv.map((item, idx) => {
          const backgroundImageUrl = item.backdrop_path
            ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
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

export default TvCarousel