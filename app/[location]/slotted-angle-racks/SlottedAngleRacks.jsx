import GetQuoteSection from '@/components/GetQuoteSection'
import CityContactCTA from '@/components/SlottedAngleRacks/CityContactCTA'
import CityFaq from '@/components/SlottedAngleRacks/CityFaq'
import HeroSlotted from '@/components/SlottedAngleRacks/HeroSlotted'
import IndustryApplications from '@/components/SlottedAngleRacks/IndustryApplications'
import LoadSuitabilitySection from '@/components/SlottedAngleRacks/LoadSuitabilitySection'
import ManufacturerSection from '@/components/SlottedAngleRacks/ManufacturerSection'
import RackPricingSection from '@/components/SlottedAngleRacks/RackPricingSection'
import ServiceAreasSection from '@/components/SlottedAngleRacks/ServiceAreasSection'
import SlottedRackRange from '@/components/SlottedAngleRacks/SlottedRackRange'
import React from 'react'

export default function SlottedAngleRacks({city}) {
  return (
    <>
    <HeroSlotted city={city} />
    <ManufacturerSection city={city} />
    <SlottedRackRange />
    <LoadSuitabilitySection />
    <RackPricingSection city={city} />
    <IndustryApplications city={city} />
    <CityContactCTA cityName={city}
  phone="+91 76298 27285"
  whatsapp="917629827285"
  image="/hero_800_mob.webp" />
    <CityFaq city={city} />
    <GetQuoteSection product="Slotted Angle Racks" />
    </>
  )
}
