'use client';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSettingsStore } from '@/store/settings.store';
import { currencies } from '@/lib/constants/currencies';

export default function Settings() {
  const { currency, setCurrency } = useSettingsStore();

  return (
    <div className='p-4 lg:max-w-[30rem] w-[calc(100vw-2.5rem)] mx-auto'>
      <h1 className='text-2xl font-bold mb-6 text-center text-white'>
        Settings
      </h1>

      <div className='space-y-6'>
        <div className='space-y-2 text-white'>
          <Label
            htmlFor='currency'
            className='block text-lg text-white pl-4 mb-2'
          >
            Home Currency
          </Label>
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className='w-full rounded-full bg-white border-0 py-6 pl-4 pr-12 text-gray-900 text-xl ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600'>
              <SelectValue placeholder='Select your currency' />
            </SelectTrigger>
            <SelectContent className='bg-white border-gray-300'>
              {currencies.map((currency) => (
                <SelectItem
                  key={currency.code}
                  value={currency.code}
                  className='text-gray-900 text-lg hover:bg-gray-100'
                >
                  {currency.symbol} {currency.code} - {currency.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className='block text-md text-muted-foreground pl-4 mb-2'>
            Choose your preferred currency for conversion.
          </p>
        </div>
      </div>
    </div>
  );
}
