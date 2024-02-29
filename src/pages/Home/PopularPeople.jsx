import React from 'react';
import { useNavigate } from 'react-router-dom';
import PeopleCard from '../../components/PeopleCard';

const PopularPeople = ({ people }) => {
  const navigate = useNavigate()
    console.log('people', people)
  return (
    <div className='w-full h-screen flex flex-col gap-10' >
        <div>
            <h1 className='text-3xl font-bold'>Popular People</h1>
            <button className='bg-[#33333A] px-3 py-1 rounded-3xl my-3'>View More</button>
        </div>
        <div className='overflow-x-scroll overflow-y-hidden dmovies grid grid-rows-[50vh] grid-cols-auto whitespace-wrap w-full relative h-full max-w-screen-xl mx-auto'>
      <div className="flex h-max">
        {people.map((item, index) => <PeopleCard key={index} profile_path={item.profile_path} id={item.id} name={item.name} />)}
      </div>
    </div>
    </div>
  );
};

export default PopularPeople;
