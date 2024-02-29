import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Pagination from '../../../components/Pagination';
import PeopleCard from '../../../components/PeopleCard';

const PeopleWeek = () => {
  const API_KEY = '87636e588ce5feff057621a8b2d7dbe1';
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const { page } = useParams();
  const pageNumber = decodeURIComponent(page);

  const getTvs = (pageNumber) => {
    setLoading(true);
    fetch(`https://api.themoviedb.org/3/trending/person/week?language=en-US&page=${pageNumber}&api_key=${API_KEY}`)
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
    navigate(`/trending/people/week/${encodeURIComponent(newPage)}`);
    console.log(`Navigating to page ${newPage}`);
  };

  useEffect(() => {
    getTvs(pageNumber);
  }, [pageNumber]);

  return (
    <div>
      <div className='flex justify-between'>
        <h1>Trending People Week</h1>
      </div>
      <div className='flex flex-row flex-wrap justify-center gap-5'>
        {loading ? (
          <p>Loading...</p>
        ) : (
            trending.map((item, index) => <PeopleCard key={index} profile_path={item.profile_path} id={item.id} name={item.name} />)
        )}
      </div>
          <Pagination pageNumber={pageNumber} handlePageClick={handlePageClick} totalPages={300} />
   </div>
  );
}

export default PeopleWeek;
