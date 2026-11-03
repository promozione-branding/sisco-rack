import React from 'react';
import { indianCities } from '@/lib/city';  
import { redirect } from 'next/navigation';
import Supermarketrack from './Supermarketrack';

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
            <Supermarketrack city={city}  />
        </>
    );
}