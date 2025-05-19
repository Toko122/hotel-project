import React from 'react'
import { assets } from "../assets/assets"

const StayInspired = () => {
  return (
    <div className='bg-white px-4 py-14 md:px-6 md:py-20 lg:px-36 lg:py-32'>

      <div className='bg-[#111827] rounded-[24px] px-6 py-10 md:px-16 md:py-16 flex flex-col gap-8 items-center text-center'>

        <div className='flex flex-col gap-4 max-w-2xl'>
          <h1 className='text-2xl md:text-4xl text-white font-semibold'>Stay Inspired</h1>
          <p className='text-gray-400 text-sm md:text-base'>
            Join our newsletter and be the first to discover new destinations, exclusive offers, and travel inspiration.
          </p>
        </div>

        
        <div className='w-full max-w-md flex flex-col md:flex-row gap-4'>
          <input
            type='email'
            placeholder='Enter your email'
            className='flex-1 border border-gray-600 rounded-md bg-transparent px-4 py-2 text-white placeholder-gray-400 outline-none'
          />
          <button className='flex items-center justify-center gap-2 bg-white text-black px-4 py-2 rounded-md transition-all duration-300 group hover:bg-gray-200'>
            <span>Submit</span>
            <img
              src={assets.arrowIcon}
              alt='arrow'
              className='w-4 transition-transform duration-300 group-hover:translate-x-1'
            />
          </button>
        </div>

        <p className='text-gray-500 text-xs md:text-sm max-w-lg'>
          By subscribing, you agree to our Privacy Policy and consent to receive updates.
        </p>

      </div>
    </div>
  )
}

export default StayInspired
