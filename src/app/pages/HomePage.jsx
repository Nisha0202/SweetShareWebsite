import React from 'react'
import Hero from '../components/Hero'
import FeaturedRecipesCarousel from '../components/FeaturedRecipesCarousel'
import UserInteractionPage from './UserInteractionPage'

export default function HomePage() {
  return (
    <div className='w-full'>
      <Hero/>
      <FeaturedRecipesCarousel/>
      <UserInteractionPage/>
    </div>
  )
}
