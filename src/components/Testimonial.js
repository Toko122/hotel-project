import React from 'react'
import {testimonials } from '../assets/assets'
import StarRating from './StarRating'

const Testimonial = () => {
  return (
    <>
      <div className='bg-[#F6F9FC] px-8 pt-24 pb-50'>
               
            <div className='flex flex-col gap-6 items-center justify-center'>

              <div className='flex flex-col gap-6 items-center justify-center'>
                     <h1 className='text-2xl sm:text-4xl font-semibold'>What Our Guests Say</h1>
                    <p className='text-gray-500 max-w-150 text-center sm:text-md text-[15px]'>Discover why discerning travelers choose QuickStay for their luxury accommodations around the world.</p>
              </div>

              <div className='flex gap-4 justify-center items-center mt-6 flex-wrap'>
                {
                    testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow">
                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className="font-playfair text-xl">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.address}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            <StarRating />
                        </div>
                        <p className="text-gray-500 max-w-90 mt-4">"{testimonial.review}"</p>
                    </div>
                    ))
                }
              </div>

            </div>

      </div>
    </>
  )
}

export default Testimonial