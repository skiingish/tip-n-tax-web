import type { Provinces } from '../types/types';
import { motion } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useLocationStore } from '@/store/location.store';

interface LocationSelectionProps {
  label?: string;
  isFocused?: boolean;
  onFocusChange?: (focused: boolean) => void;
}

export default function LocationSelection({
  label = 'Select Province',
  isFocused,
  onFocusChange,
}: LocationSelectionProps) {
  const { province, setProvince } = useLocationStore();

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
    <div className='w-full max-w-sm'>
      <Label
        htmlFor='province-select'
        className='block text-lg text-white pl-4 0 mb-2'
      >
        {label}
      </Label>
      <motion.div
        className='w-full max-w-sm'
        initial={false}
        animate={isFocused ? { scale: 1.03 } : { scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Select
          onValueChange={setProvince}
          value={province}
          onOpenChange={onFocusChange}
        >
          <SelectTrigger
            id='province-select'
            className='w-full rounded-full bg-white border-0 py-6 pl-4 pr-12 text-gray-900 text-xl ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
          >
            <SelectValue placeholder='Select a province' />
          </SelectTrigger>
          <SelectContent className='bg-white border-gray-300'>
            <SelectGroup>
              {provinces.map((province) => (
                <SelectItem
                  key={province}
                  value={province}
                  className='text-gray-900 text-lg hover:bg-gray-100'
                >
                  {province}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </motion.div>
    </div>
  );
}
