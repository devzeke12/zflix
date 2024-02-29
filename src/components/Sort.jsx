import React from 'react'
import { useNavigate } from 'react-router-dom'


const Sort = ({ sort, setSort }) => {
    const navigate = useNavigate();
    const sortConntent = [
        {
            title: 'Popularity Descending',
            value: 'popularity.desc'
        },
        {
            title: 'Popularity Ascending',
            value: 'popularity.asc'
        },
        {
            title: 'Release Date Descending',
            value: 'primary_release_date.desc'
        },
        {
            title: 'Release Date Ascending',
            value: 'primary_release_date.asc'
        },
        {
            title: 'Title (A-Z)',
            value: 'popularity.desc'
        },
        {
            title: 'Title (Z-A)',
            value: 'popularity.asc'
        },
        {
            title: 'Vote Average Descending',
            value: 'vote_average.desc'
        },
        {
            title: 'Vote Average Descending',
            value: 'vote_average.asc'
        },


    ]
  return (
          <select className="border border-gray-300 rounded-md shadow-sm text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-200" onChange={(e) => setSort(e.target.value)}>
            {sortConntent.map((option, index) => (
              <option key={index} value={option.value}>
                {option.title}
              </option>
            ))}
          </select>

  )
}

export default Sort;