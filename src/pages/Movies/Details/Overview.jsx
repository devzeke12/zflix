import React, { useEffect, useState } from 'react'
import PeopleCard from '../../../components/PeopleCard';
import { useParams } from 'react-router-dom';




const Overview = ({ details }) => {
  const { title, status, production_companies, spoken_languages, budget, revenue, overview, production_countries } = details;
  const { id } = useParams();
  const ID = decodeURIComponent(id);
 const API_KEY = '87636e588ce5feff057621a8b2d7dbe1';
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCast = (ID) => {
    setIsLoading(true);
    fetch(`https://api.themoviedb.org/3/movie/${ID}/credits?language=en-US&api_key=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setCast(data.cast);
        console.log('id', ID, 'type', cast)
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getCast(ID);
  }, []);


  const NumberWithCommas = ({ number }) => {
    // Convert the number to a string
    const numberString = number.toString();
  
    // Use a regular expression to add commas
    const formattedNumber = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
    return <span>{formattedNumber}</span>;
  };
  if (isLoading) {
    return <div>Loading...</div>; // Replace with your loading component
  }
  return (
    <div>
    <div className='relative flex flex-row'>
        <div className='w-1/3'>
            <div>
            <h1>Original Title</h1>
            <h1>{title}</h1>
            </div>
            <div>
            <h1>Status</h1>
            <h1>{status}</h1>
            </div>
            <div>
                <h1>{production_companies.length > 1 ? 'Production Companies' : 'Production Company'}</h1>
                {production_companies.map((item, index) => <h1 key={index}>{item.name}</h1>)}
            </div>
            
            <div>
            <h1>Budget</h1>
            <h1>$<NumberWithCommas number={budget} /></h1>
            </div>
            <div>
            <h1>Revenue</h1>
            <h1>$<NumberWithCommas number={revenue} /></h1>
            </div>
        </div>
        <div className='w-2/3'>
            <div>
            <h1>{overview}</h1>  
            <h1>{production_countries.length > 1 ? 'Production Countries' : 'Production Country'}</h1>  
            {production_countries.map((item, index) => <h1 key={index}>{item.name}</h1>)}
            <div>
                <h1>Language(s) Spoken:</h1>
                {spoken_languages.map((item, index) => <h1 key={index}>{item.name}</h1>)}
            </div>
            </div>

            
        </div>
    </div>
    <div className='w-full h-screen flex flex-col gap-10' >
        <div>
            <h1 className='text-3xl font-bold'>Casts</h1>
        </div>
        <div className='overflow-x-scroll overflow-y-hidden dmovies grid grid-rows-[50vh] grid-cols-auto whitespace-wrap w-full relative h-full max-w-screen-xl mx-auto'>
      <div className="flex h-max">
        {cast.map((item, index) => <PeopleCard key={index} profile_path={item.profile_path} id={item.id} name={item.name} />)}
      </div>
    </div>
    </div>
    </div>

  )
}

export default Overview