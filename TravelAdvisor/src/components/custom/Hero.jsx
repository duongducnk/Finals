import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
      <h1 className='font-extrabold text-[50px] text-center mt-16'>
      <span className='text-[#64c2db]'>Make Your Trip</span><br></br> 
      <span className='text-[#7476ed]'>Become </span> <br></br>
      <span className='text-[#e56f8c]'>A Wonderful Memory</span>
      
      </h1>
      <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel manager, creating custom journeys to suit your interests and budget</p>
      <Link to = {'/create-trip'}>
        <Button>Get started. It's free</Button>
      </Link>
    </div>
  )
}

export default Hero