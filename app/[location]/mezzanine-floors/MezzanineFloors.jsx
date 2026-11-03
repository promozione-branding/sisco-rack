import CityContactCTA from '@/components/MezzanineFloors/CityContactCTA'
import CityFaq from '@/components/MezzanineFloors/CityFaq'
import MezzanineAbout from '@/components/MezzanineFloors/MezzanineAbout'
import MezzanineHero from '@/components/MezzanineFloors/MezzanineHero'
import MezzanineLoadRating from '@/components/MezzanineFloors/MezzanineLoadRating'
import MezzanineProductCards from '@/components/MezzanineFloors/MezzanineProductCards'
import MezzanineSiteChecks from '@/components/MezzanineFloors/MezzanineSiteCheck'
import React from 'react'

export default function MezzanineFloors({city}) {
  return (
    <>
    <MezzanineHero city={city} />
    <MezzanineAbout city={city} />
    <MezzanineProductCards />
    <MezzanineLoadRating />
    <MezzanineSiteChecks />
    <CityContactCTA cityName={city}/>
    <CityFaq city={city} />
    </>
  )
}
