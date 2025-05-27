import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const HotelCard = ({ room, index }) => {
  return (
    <>
    <Link to={`/room/${room._id}`} onClick={() => window.scrollTo(0, 0)} key={room._id} className=' max-w-70 relative bg-white w-full rounded-xl overflow-hidden text-gray-500/90 shadow-[0px_4px_4px_rgba(0,0,0,0.5)]'>
      <img src={room.images[0]} alt='room' className=''/>
       
      {index % 2 === 0 && <p className='px-3 py-1 absolute top-3 left-3 text-xs bg-white text-gray-800 font-medium rounded-full'>Best Seller</p>}

       <div className='md:p-4 p-3 pt-5'>
            <div className='flex items-center md:justify-between justify-start md:gap-0 gap-4'>
              <p className='md:text-xl text-[15px] font-medium text-gray-800'>{room.hotel.name}</p>
            
            <div className="flex items-center gap-1">
              <img src={assets.starIconFilled} alt='rating' />
              <span>4.5</span>
            </div>
            </div>

             <div className='flex gap-1 mt-1'>
                <img src={assets.locationIcon} alt='' />
                <span className='text-gray-500 font-medium'>Maldives</span>
             </div>

             <div className='flex gap-2 mt-1 justify-between items-center'>
                   <div className='font-medium text-lg text-[#1F2937]'>$ {room.pricePerNight} <span className='text-base text-gray-500'>/ night</span></div>
                    <span className='md:px-4 px-2 py-2 md:text-sm text-[12px] font-medium border border-gray-300 rounded hover:bg-gray-50 transition-all cursor-pointer'>View Details</span>
             </div>
          </div>
          
    </Link>
    
     </>
  )
}

export default HotelCard
