import React from 'react'
import Hero from '../../components/Hero'
import FeaturedRecipesCarousel from '../../components/FeaturedRecipesCarousel'
import UserInteractionPage from './UserInteractionPage'

export default function HomePage() {
  return (
    <div className='w-full'>
      <Hero/>
      <section>
      <h2 className="text-2xl font-semibold text-center text-primary mt-12 lg:mt-20">Featured Recepies</h2>
      </section>
      <FeaturedRecipesCarousel/>
      <UserInteractionPage/>
    </div>
  )
}
