import React from 'react';
import SlottedAngleRacks from './SlottedAngleRacks';
import { indianCities } from '@/lib/city';  
import { redirect } from 'next/navigation';

export async function generateStaticParams() {
    return indianCities.map((location) => ({
        location,
    }));
}

export default async function Page({ params }) {
    const { location } = await params;

     if (!indianCities.includes(location)) {
        redirect('/');
    }


    const city = location
        .replaceAll('-', ' ')
        .replace(/\b\w/g, char => char.toUpperCase());

    return (
        <>
            <SlottedAngleRacks city={city} location={location} />
        </>
    );
}