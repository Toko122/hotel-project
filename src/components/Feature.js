import React from 'react'
import HotelCard from './HotelCard'
import { roomsDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Feature = () => {

    const navigate = useNavigate()

  return (
    <div className='flex bg-[#F6F9FC] flex-col gap-16 justify-center items-center py-22 px-22'>
       
       <div className='flex flex-col gap-4 md:gap-8 justify-center md:items-center'>
          <h1 className='md:text-5xl text-2xl font-medium'>Featured Hotels</h1>
          <p className='text-gray-500 text-[14px] md:text-base md:w-[70%] md:text-center'>Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences</p>
       </div>

       <div className='flex gap-12 flex-wrap justify-center'> 
            {
                roomsDummyData.slice(0,4).map((room, index) => (
                    <HotelCard room={room} key={room._id} index={index} />
                ))
            }
       </div>
       <button onClick={()=> {navigate("/rooms"); window.scrollTo(0,0)}} className='py-2 px-8 cursor-pointer bg-white border border-gray-400 rounded-sm text-gray-500 '>View All Hotels</button>

    </div>
  )
}

export default Feature
