'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MoneyInput } from './MoneyInput';
import LocationSelection from './LocationSelection';

interface InputSectionProps {
  onAmountChange: (value: number) => void;
}

const InputSection: React.FC<InputSectionProps> = ({ onAmountChange }) => {
  const [isLocationSelectionFocused, setLocationSelectionFocused] =
    useState(false);
  const [isFocusedMoneyInput, setIsFocusedMoneyInput] = useState(false);

  return (
    <motion.div
      className='flex flex-col items-center pt-5 pb-6 px-4 rounded-3xl gap-2'
      animate={{
        background:
          isLocationSelectionFocused || isFocusedMoneyInput
            ? [
                'linear-gradient(0deg, rgb(147 197 253 / 0.7), rgb(59 130 246))',
                'linear-gradient(180deg, rgb(147 197 253 / 0.7), rgb(59 130 246))',
              ]
            : [
                'linear-gradient(180deg, rgb(147 197 253 / 0.7), rgb(59 130 246))',
                'linear-gradient(0deg, rgb(147 197 253 / 0.7), rgb(59 130 246))',
              ],
        boxShadow:
          isLocationSelectionFocused || isFocusedMoneyInput
            ? [
                '0px 10px 25px -5px rgb(59 130 246 / 0.3)',
                '0px -10px 25px -5px rgb(59 130 246 / 0.3)',
              ]
            : [
                '0px -10px 25px -5px rgb(59 130 246 / 0.3)',
                '0px 10px 25px -5px rgb(59 130 246 / 0.3)',
              ],
      }}
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
        times: [0, 1],
      }}
    >
      <LocationSelection onFocusChange={setLocationSelectionFocused} />
      <MoneyInput
        label='Amount in CAD $'
        onChange={onAmountChange}
        onFocusChange={setIsFocusedMoneyInput}
      />
    </motion.div>
  );
};

export default InputSection;
