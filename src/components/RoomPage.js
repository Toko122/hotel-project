import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { roomsDummyData, facilityIcons, roomCommonData } from '../assets/assets'

const RoomPage = () => {
   
    const { id } = useParams()
    const [room, setRoom] = useState(null)

    useEffect(() => {
        const foundRoom = roomsDummyData.find(room => room._id === id)
        setRoom(foundRoom)
    }, [id])

    if (!room) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>
    }

    return (
        <div className='bg-[#FDFDFD] py-36 px-24 md:px-8 lg:px-16'>

             <div className='flex flex-col gap-12 items-start justify-center px-34'>

                <div className='flex gap-4 justify-start items-end'>
                     <span className='text-3xl font-semibold'>Urbanza Suites</span>
                     ({room.roomType})
                     <span className='bg-[#F8701B] py-1 text-[12px] text-white px-2.5 rounded-full'>20% OFF</span>
                </div>

             <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
                    {room.images.map((image, index) => (
                         <img 
                         key={index}
                         src={image} 
                         alt={`Room view ${index + 1}`}
                         className='w-full h-[300px] object-cover rounded-lg'
                     />
                    ))}
                </div>

             </div>

        </div> 
    )
}

export default RoomPage