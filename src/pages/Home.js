import React from 'react'
import Hero from '../components/Hero'
import Feature from '../components/Feature'
import ExclusiveOffers from '../components/ExclusiveOffers'
import Testimonial from '../components/Testimonial'
import StayInspired from '../components/StayInspired'

export const Home = () => {
  return (
    <>
       <Hero />
       <Feature/>
       <ExclusiveOffers />
       <Testimonial />
       <StayInspired />
    </>
  )
}
