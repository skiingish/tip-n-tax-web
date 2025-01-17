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
    <div className='p-4 max-w-2xl mx-auto'>
      <h1 className='text-2xl font-bold mb-6'>Settings</h1>

      <div className='space-y-6'>
        <div className='space-y-2 text-white'>
          <Label htmlFor='currency'>Home Currency</Label>
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className='w-full text-white'>
              <SelectValue placeholder='Select your currency' />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  {currency.symbol} {currency.code} - {currency.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className='text-sm text-muted-foreground'>
            Choose your preferred currency for calculations
          </p>
        </div>
      </div>
    </div>
  );
}
