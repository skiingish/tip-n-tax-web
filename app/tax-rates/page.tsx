'use client';
import taxRateCaLookup from '@/lib/constants/canadaTaxLookup';
import { Provinces } from '@/types/types';

export default function TaxRates() {
  const provinces: Provinces[] = [
    'Alberta',
    'British Columbia',
    'Manitoba',
    'New Brunswick',
    'Newfoundland and Labrador',
    'Northwest Territories',
    'Nova Scotia',
    'Nunavut',
    'Ontario',
    'Prince Edward Island',
    'Quebec',
    'Saskatchewan',
    'Yukon',
  ];

  return (
    <div className='p-4 lg:max-w-[30rem] w-[calc(100vw-2.5rem)] mx-auto text-white'>
      <h1 className='text-2xl font-bold mb-4 text-center'>
        Canadian Tax Rates
      </h1>
      <ul>
        <div className='text-center text-lg'>
          {provinces.map((province) => (
            <li key={province} className='mb-2'>
              <span className='font-semibold'>{province}:</span>{' '}
              {taxRateCaLookup(province)}%
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}
