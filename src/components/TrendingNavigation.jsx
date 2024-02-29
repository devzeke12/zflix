import React from 'react'
import { useNavigate } from 'react-router-dom'

const TrendingNavigation = ({ navs }) => {
    const navigate = useNavigate()
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

export default TrendingNavigation