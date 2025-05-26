import React, { useState } from 'react'
import { assets, facilityIcons, hotelDummyData, roomsDummyData } from '../assets/assets'
import StarRating from './StarRating'
import { useNavigate } from 'react-router-dom'
import { useClerk, useUser, UserButton } from '@clerk/clerk-react'
import RoomPage from './RoomPage'

const HotelsPage = () => {
    const [hotels, setHotels] = useState(roomsDummyData)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [newHotel, setNewHotel] = useState({
        images: [],
        hotel: {
            city: "",
            name: "",
            address: ""
        },
        pricePerNight: "",
        amenities: []
    })
    const [previewImage, setPreviewImage] = useState(null)

    const roomTypes = [
        "Single Bed",
        "Family Suite",
        "Double Bed",
        "Luxury Room",
    ]

    const price = [
        "₹2500 to ₹5000",
        "₹5000 to ₹8000",
        "₹8000 to ₹15000",
    ]

    const sortBy = [
        "Price Low to High",
        "Price High to Low",
        "Newest First",
    ]

    const availableAmenities = ["WiFi", "Pool", "Parking", "Gym", "Spa", "Restaurant", "Bar", "Room Service"]

    const handleInputChange = (e) => {
        const { name, value } = e.target
        if (name.includes('.')) {
            const [parent, child] = name.split('.')
            setNewHotel(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }))
        } else {
            setNewHotel(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    const handleImageUpload = (e)=>{
        const file = e.target.files[0]
        if(file){
            const reader = new FileReader()
            reader.onloadend = ()=>{
                setPreviewImage(reader.result)
                setNewHotel(prev => ({
                   ...prev,
                   images: [reader.result] 
                }))
            }
            reader.readAsDataURL(file)
        }
    }
    

    const handleAmenityToggle = (amenity) => {
        setNewHotel(prev => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity]
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const hotelToAdd = {
            _id: Date.now(),
            ...newHotel
        }
        setHotels([...hotels, hotelToAdd])
        setIsModalOpen(false)
        setNewHotel({
            images: [],
            hotel: {
                city: "",
                name: "",
                address: ""
            },
            pricePerNight: "",
            amenities: []
        })
        setPreviewImage(null)
    }

    const navigate = useNavigate()

    const {user} = useUser()
    const {openSignIn} = useClerk()

    return (
        <>
            <div className='bg-[#FDFDFD] min-h-screen'>
                <div className='container mx-auto px-4 py-24 md:py-36 md:px-6 lg:px-8'>
                    <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
                        {/* Filters Section */}
                        <div className='lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] lg:overflow-y-auto'>
                            <div className='bg-white rounded-lg shadow-md p-4 border border-gray-200'>
                                <div className='flex justify-between items-center mb-4'>
                                    <h1 className='text-xl font-semibold text-gray-800'>Filters</h1>
                                    <button className='text-sm text-blue-600 hover:text-blue-800 transition-colors'>CLEAR</button>
                                </div>
                                
                                <div className='space-y-6'>
                                    <div className='space-y-4'>
                                        <h2 className='text-lg font-medium text-gray-700'>Popular filters</h2>
                                        <div className='space-y-3'>
                                            {roomTypes.map((item, index) => (
                                                <label key={index} className='flex items-center space-x-3 cursor-pointer'>
                                                    <input type='checkbox' className='rounded text-blue-600 focus:ring-blue-500' />
                                                    <span className='text-gray-600'>{item}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className='space-y-4'>
                                        <h2 className='text-lg font-medium text-gray-700'>Price</h2>
                                        <div className='space-y-3'>
                                            {price.map((item, index) => (
                                                <label key={index} className='flex items-center space-x-3 cursor-pointer'>
                                                    <input type='checkbox' className='rounded text-blue-600 focus:ring-blue-500' />
                                                    <span className='text-gray-600'>{item}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className='space-y-4'>
                                        <h2 className='text-lg font-medium text-gray-700'>Sort By</h2>
                                        <div className='space-y-3'>
                                            {sortBy.map((item, index) => (
                                                <label key={index} className='flex items-center space-x-3 cursor-pointer'>
                                                    <input type='checkbox' className='rounded text-blue-600 focus:ring-blue-500' />
                                                    <span className='text-gray-600'>{item}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='lg:col-span-3'>
                        <div className='mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                                <div>
                                    <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>Hotel Rooms</h1>
                                    <p className='text-gray-600 max-w-2xl'>Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.</p>
                                </div>
                                
                                
                                    {
                                        user ? (
<button 
                                    onClick={() => setIsModalOpen(true)}
                                    className='w-full sm:w-auto cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                    Add Hotel
                                </button>
                                        ) : (
<button 
                                    onClick={openSignIn}
                                    className='w-full sm:w-auto cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                    Add Hotel
                                </button>
                                        )
                                    }
                                   

                            </div>

                            
<div className='space-y-6'>
    {hotels.map((room, index) => (
        <div key={room._id} onClick={() => navigate(`/room/${room._id}`)} className='bg-white cursor-pointer rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300'>
            <div className='flex flex-col md:flex-row'>
                <div className='md:w-1/2'>
                    <img 
                        src={room.images[0]} 
                        alt={room.hotel.name} 
                        className='w-full h-[250px] md:h-full object-cover'
                    />
                </div>
                
                <div className='p-6 md:w-1/2'>
                    <div className='space-y-4'>
                        <div>
                            <p className='text-sm text-gray-500'>{room.hotel.city}</p>
                            <h2 className='text-2xl font-semibold text-gray-900'>{room.hotel.name}</h2>
                        </div>

                        <div className='flex items-center space-x-2'>
                            <StarRating />
                            <span className='text-sm font-medium text-gray-600'>+200 reviews</span>
                        </div>

                        <div className='flex items-center space-x-2'>
                            <img src={assets.locationIcon} alt='location' className='w-4 h-4' />
                            <span className='text-sm text-gray-600'>{room.hotel.address}</span>
                        </div>

                        <div className='flex flex-wrap gap-2'>
                            {room.amenities.map((item, index) => (
                                <div key={index} className='flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-full'>
                                    <img src={facilityIcons[item]} alt={item} className='w-4 h-4' />
                                    <span className='text-xs text-gray-600'>{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className='pt-4'>
                            <p className='text-2xl font-bold text-gray-900'>$ {room.pricePerNight} <span className='text-sm font-normal text-gray-500'>/night</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ))}
</div>
                        </div>
                    </div>
                </div>
            </div>

        
            {isModalOpen && (
                <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] w-full h-screen flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Create New Room</h2>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 cursor-pointer hover:text-gray-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                           
                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-gray-700">Room Photo</label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                                    <div className="space-y-1 text-center">
                                        {previewImage ? (
                                            <div className="relative">
                                                <img
                                                    src={previewImage}
                                                    alt="Preview"
                                                    className="mx-auto h-32 w-auto object-cover rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setPreviewImage(null)
                                                        setNewHotel(prev => ({ ...prev, images: [] }))
                                                    }}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 cursor-pointer w-4 " viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    viewBox="0 0 48 48"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                <div className="flex text-sm text-gray-600">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                                    >
                                                        <span>Upload a photo</span>
                                                        <input
                                                            id="file-upload"
                                                            name="file-upload"
                                                            type="file"
                                                            className="sr-only"
                                                            accept="image/*"
                                                            onChange={handleImageUpload}
                                                            required
                                                        />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Room Title</label>
                                    <input
                                        type="text"
                                        name="hotel.name"
                                        value={newHotel.hotel.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter room title"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                    <input
                                        type="text"
                                        name="hotel.city"
                                        value={newHotel.hotel.city}
                                        onChange={handleInputChange}
                                        placeholder="Enter city"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                    <input
                                        type="text"
                                        name="hotel.address"
                                        value={newHotel.hotel.address}
                                        onChange={handleInputChange}
                                        placeholder="Enter full address"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Price per Night ($)</label>
                                    <input
                                        type="number"
                                        name="pricePerNight"
                                        value={newHotel.pricePerNight}
                                        onChange={handleInputChange}
                                        placeholder="Enter price"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {availableAmenities.map((amenity) => (
                                        <label key={amenity} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={newHotel.amenities.includes(amenity)}
                                                onChange={() => handleAmenityToggle(amenity)}
                                                className="rounded text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-600">{amenity}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Create Room
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default HotelsPage