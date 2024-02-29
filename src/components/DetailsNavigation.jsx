import React from 'react'
import { useNavigate } from 'react-router-dom'

const DetailsNavigation = ({ id }) => {
    const navigate = useNavigate()
    const navs = [
        {
          title: 'Overview',
          path: `/movie/${id}`
        },
        {
          title: 'Cast',
          path: `/movie/${id}/cast`
        },
        {
          title: 'Videos',
          path: `/movie/${id}/videos`
        },
        {
          title: 'Photo',
          path: `/movie/${id}/photos`
        },
        {
          title: 'Reconmendation',
          path: '/'
        },
        {
          title: 'Similar',
          path: '/'
        },
      ]
  return (
    <div className='flex flex-row justify-around h-20 border-b items-end'>
        {navs.map((nav, index) => <button key={index} onClick={() => {
  try {
    navigate(nav.path);
  } catch (error) {
    console.error('Navigation error:', error);
  }
}}>
  {nav.title}
</button>
)}
    </div>
  )
}

export default DetailsNavigation