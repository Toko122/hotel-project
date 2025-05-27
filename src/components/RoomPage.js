import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { roomsDummyData, facilityIcons, roomCommonData } from '../assets/assets'
import StarRating from './StarRating'

const RoomPage = () => {
   
    const { id } = useParams()
    const [room, setRoom] = useState(null)
    const [mainImage, setMainImage] = useState(null)

    useEffect(()=>{
        const room = roomsDummyData.find(room => room._id === id)
        room && setRoom(room)
        room && setMainImage(room.images[0])
    }, [room])

    useEffect(() => {
        const foundRoom = roomsDummyData.find(room => room._id === id)
        setRoom(foundRoom)
    }, [id])

    if (!room) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>
    }

    return (
        <div className='bg-[#FDFDFD] py-28 md:py-36 md:px-8 lg:px-16'>

             <div className='flex flex-col gap-3 items-start justify-center px-4 md:px-34'>

                <div className='flex gap-4 justify-between w-full lg:justify-start items-end'>
                     <span className='text-2xl md:text-3xl font-semibold'>Urbanza Suites</span>
                     
                     <div className='flex gap-2'>
                     ({room.roomType})
                     <span className='bg-[#F8701B] py-1 text-[12px] text-white px-2.5 rounded-full'>20% OFF</span>
                     </div>
                </div>

                <div className="flex items-center gap-1">
                            <StarRating />
                            <span className='font-semibold'>+200 reviews</span>
                        </div>

                <div className='text-gray-500'>
                    {room.hotel.address}
                </div>

                  <div className='flex flex-col lg:flex-row gap-6 mt-6'>
                      <div className='lg:w-1/2 w-full'>
                         <img src={mainImage} alt='' className='w-full rounded-xl shadow-lg object-cover' />
                      </div>

                      <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
                        {
                            room?.images.length > 1 && room.images.map((image, index) => (
                                <img key={index} src={image} alt='' onClick={() => setMainImage(image)}
                                 className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImage === image && 'outline-3 outline-orange-500'}`} />
                            ))
                        }
                      </div>
                  </div>


                  <div className='flex flex-col gap-6 w-full mt-2'>

                    <div className='flex md:flex-row flex-col justify-between md:items-center w-full'>
                     <span className='md:text-2xl text-[22px]'>Experience Luxury Like Never Before</span>
                     <span className='text-2xl font-semibold'>${room.pricePerNight}/day</span>
                    </div>

                 <div className='flex gap-2 flex-wrap md:justify-start justify-center'>
                    <span className='p-2 px-6 rounded-md bg-[#EEEEEE] w-fit flex gap-2 items-center'>
                       <img src={facilityIcons['Free WiFi']} alt='' />
                       <span className='text-[14px]'>free wifi</span>
                    </span>

                    <span className='p-2 px-6 rounded-md bg-[#EEEEEE] w-fit flex gap-2 items-center'>
                       <img src={facilityIcons['Free Breakfast']} alt='' />
                       <span className='text-[14px]'>free breakfast</span>
                    </span>

                    <span className='p-2 px-6 rounded-md bg-[#EEEEEE] w-fit flex gap-2 items-center'>
                       <img src={facilityIcons['Room Service']} alt='' />
                       <span className='text-[14px]'>room service</span>
                    </span>

                    </div>

                  </div>

                  <span className='md:w-1/2 w-full bg-[#ccc] h-[2px] mt-5'></span>

                  {/* check in */}

                  <div className='bg-white flex-wrap shadow-[1px_6px_6px_6px_rgba(0,0,0,0.3)] mt-4 p-8 w-full md:flex-row flex-col gap-12 flex items-center md:justify-between rounded-lg'>

                      <div className='flex gap-12 md:gap-6 justify-center items-end flex-wrap'>

                      <div className='flex flex-col gap-1 text-center'>
                        <label>Check in</label>
                        <input type='date' className='border border-gray-400 rounded-md p-1.5'/>
                      </div>

                       <span className='hidden h-[50px] lg:flex justify-center items-center w-[1px] bg-gray-300' />


                      <div className='flex flex-col gap-1 text-center'>
                        <label>Check out</label>
                        <input type='date' className='border border-gray-400 rounded-md p-1.5' />
                      </div>

                      <span className='h-[50px] hidden lg:flex justify-center items-center w-[1px] bg-gray-300' />

                      <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
                    <label htmlFor="guests">Guests</label>
                    <input min={1} max={4} id="guests" type="number" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16" placeholder="0" />
                </div>


                      </div>

                    
                           <button className='text-white text-[18px] bg-[#2563EB] md:py-3.5 py-2 md:px-26 px-19 cursor-pointer rounded-md'>Check Availability</button>
                      

                  </div>


                  <div className='flex flex-col gap-10 mt-14 max-w-[952px]'>
                    <div className='flex flex-col gap-2'>
                        {
                            roomCommonData.map((icon, index) => (
                                <div className='flex gap-3 items-center'>
                                <img src={icon.icon} key={index} alt='' className=''/>

                                <div className='flex flex-col gap-1'>
                                <span className='text-[20px] font-semibold'>{icon.title}</span>
                                <span className='text-gray-500 text-[17px]'>{icon.description}</span>
                                </div>
                                </div>
                            ))
                        }

                    </div>

                    <span className='w-full bg-gray-400 h-[1px]'></span>

                    <p className='text-gray-400'>Guests will be allocated on the ground floor according to availability. You get a comfortable Two bedroom apartment has a true city feeling. The price quoted is for two guest, at the guest slot please mark the number of guests to get the exact price for groups. The Guests will be allocated ground floor according to availability. You get the comfortable two bedroom apartment that has a true city feeling.</p>

                    <span className='w-full bg-gray-400 h-[1px]'></span>

                  </div>

             </div>

        </div> 
    )
}

export default RoomPage