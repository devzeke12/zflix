import React from 'react'
import { CiGrid41 } from "react-icons/ci";
import { BsGrid1X2 } from "react-icons/bs";


const CardToggleBtn = ({ setLayout }) => {
  return (
    <div className='flex justify-between gap-10'>
          <button onClick={() => setLayout('card')}>g</button>
          <button onClick={() => setLayout('detailed')}>gg</button>
          <button onClick={() => setLayout('long')}>ggg</button>
        </div>
  )
}

export default CardToggleBtn