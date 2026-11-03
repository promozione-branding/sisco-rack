import GetQuoteSection from '@/components/GetQuoteSection'
import CityFaq from '@/components/Supermarketracks/CityFaq'
import StorePlanningSection from '@/components/Supermarketracks/StorePlanningSection'
import SupermarketAbout from '@/components/Supermarketracks/SupermarketAbout'
import SupermarketHero from '@/components/Supermarketracks/SupermarketHero'
import SupermarketPricing from '@/components/Supermarketracks/SupermarketPricing'
import SupermarketRackProducts from '@/components/Supermarketracks/SupermarketRackProducts'
import WhyChooseSisco from '@/components/Supermarketracks/WhyChooseSisco'
import SupplyNetworkCity from '@/components/SupplyNetworkCity'
import React from 'react'

export default function Supermarketrack({city}) {
  return (
    <>
    <SupermarketHero city={city} />
    <SupermarketAbout city={city} />
    <SupermarketRackProducts city={city} />
    <StorePlanningSection city={city} />
    <SupermarketPricing city={city} />
    <WhyChooseSisco city={city} />
    <SupplyNetworkCity pagePath="/supermarket-racks" />
    <CityFaq city={city} />
    <GetQuoteSection product="Supermarket Display Racks" />
    </>
  )
}
