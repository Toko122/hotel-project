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
        <div className='bg-[#FDFDFD] py-36 md:px-8 lg:px-16'>

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

             </div>

        </div> 
    )
}

export default RoomPage