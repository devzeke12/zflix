import React from 'react'
import { useNavigate } from 'react-router-dom'

const Discover = () => {
    const navigate = useNavigate()
    const categories = [
        {
            title: 'Movies',
            path: '/movies'
        },
        {
            title: 'Tv Shows',
            path: '/tv'
        },
        {
            title: 'Anime',
            path: '/anime'
        },
        {
            title: 'People',
            path: '/people'
        },
        {
            title: 'Trending',
            path: '/trending'
        },
    ]

    const general = [
        {
            title: 'Movie Genres',
            path: '/movies'
        },
        {
            title: 'Tv Shows Genres',
            path: '/movies'
        },
        {
            title: 'Anime Genres',
            path: '/movies'
        },
        {
            title: 'Featured List',
            path: '/movies'
        },

       
    ]
  return (
    <div>
        <h1 className="text-3xl font-bold mt-8">Discover</h1>
        <button className='text-center bg-gray-500 w-full' onClick={() => navigate('/search')}>Search</button>
        <button className='text-center bg-gray-500'>Filter</button>
        <h1>Categories</h1>
        {categories.map((item, index) => <button onClick={() => navigate(item.path)} key={index}>{item.title}</button> )}
        <h1>Categories</h1>
        {general.map((item, index) => <button onClick={() => navigate(item.path)} key={index}>{item.title}</button> )}
    </div>
  )
}

export default Discover