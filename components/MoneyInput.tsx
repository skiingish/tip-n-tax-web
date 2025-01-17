'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';

interface MoneyInputProps {
  label?: string;
  currency?: string;
  placeholder?: string;
  initialValue?: string;
  focused?: boolean;
  onChange?: (value: number) => void;
  onFocusChange?: (focused: boolean) => void;
}

export const MoneyInput = ({
  label = '',
  currency = '$',
  placeholder = '0.00',
  initialValue = '',
  onChange,
  onFocusChange,
}: MoneyInputProps) => {
  const [displayValue, setDisplayValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);

  const convertToNumber = (value: string) => {
    return Number(value);
  };

  const formatValue = (value: string) => {
    // Remove non-numeric characters except decimal
    const numericValue = value.replace(/[^\d.]/g, '');
    // Ensure only one decimal point
    const parts = numericValue.split('.');
    if (parts.length > 2) return displayValue;
    if (parts[1]?.length > 2) return displayValue;
    return numericValue;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatValue(e.target.value);
    setDisplayValue(formattedValue);
    onChange?.(convertToNumber(formattedValue));
  };

  const handleBlur = () => {
    setIsFocused(false);
    onFocusChange?.(false);
    // Format to 2 decimal places when leaving field
    if (displayValue) {
      const formatted = Number(displayValue).toFixed(2);
      setDisplayValue(formatted);
      onChange?.(convertToNumber(formatted));
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    onFocusChange?.(true);
  };

  return (
    <div className='w-full max-w-sm'>
      <Label
        htmlFor='money-input'
        className='block text-lg text-white pl-4 0 mb-2'
      >
        {label}
      </Label>
      <motion.div
        className='relative rounded-full shadow-sm text-xl'
        initial={false}
        animate={isFocused ? { scale: 1.03 } : { scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <motion.div
          className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 z-10'
          initial={false}
          animate={isFocused ? { x: -5 } : { x: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <span className='text-gray-500 text-xl font-medium'>{currency}</span>
        </motion.div>
        <Input
          type='text'
          name='money-input'
          id='money-input'
          className='block w-full rounded-full bg-white border-0 py-6 pl-10 pr-12 text-gray-900 text-xl ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
          placeholder={placeholder}
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          aria-label={`Enter amount in ${currency}`}
        />
      </motion.div>
    </div>
  );
};
