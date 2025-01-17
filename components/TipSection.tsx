'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Slider } from './ui/slider';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

interface InputSectionProps {
  onAmountChange: (value: number) => void;
}

const TipSection: React.FC<InputSectionProps> = ({ onAmountChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedTip, setSelectedTip] = useState(18);

  const tipPresets = [
    {
      value: 0,
      label: 'N/A',
      emoji: '❌',
      description:
        'No tip - as it`s not required (i.e retail stores) or takeaways',
    },
    {
      value: 10,
      label: '10%',
      emoji: '😐',
      description:
        'Average service or little interaction with the server (bar)',
    },
    {
      value: 15,
      label: '15%',
      emoji: '👍',
      description: 'Standard tip for adequate service',
    },
    {
      value: 18,
      label: '18%',
      emoji: '🎯',
      description: 'Good service - common in most restaurants',
    },
    {
      value: 20,
      label: '20%',
      emoji: '⭐',
      description: 'Great service - shows extra appreciation',
    },
    {
      value: 25,
      label: '25%',
      emoji: '🌟',
      description: 'Exceptional service - very generous',
    },
  ];

  const handleTipSelect = (tip: number) => {
    setSelectedTip(tip);
    onAmountChange(tip);
  };

  return (
    <motion.div
      className='flex flex-col items-center pt-5 pb-5 px-4 rounded-3xl'
      animate={{
        background: isFocused
          ? [
              'linear-gradient(0deg, rgb(147 197 253 / 0.7), rgb(59 130 246))',
              'linear-gradient(180deg, rgb(147 197 253 / 0.7), rgb(59 130 246))',
            ]
          : [
              'linear-gradient(180deg, rgb(147 197 253 / 0.7), rgb(59 130 246))',
              'linear-gradient(0deg, rgb(147 197 253 / 0.7), rgb(59 130 246))',
            ],
        boxShadow: isFocused
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
      <div className='text-center mb-5'>
        <span className='text-2xl font-bold text-white'>
          {selectedTip === 0 ? 'Not Required' : `Tip: ${selectedTip}%`}
        </span>
      </div>

      <div className='flex flex-wrap gap-3 mb-6 justify-center'>
        {tipPresets.map((tip) => (
          <HoverCard key={tip.value}>
            <HoverCardTrigger>
              <button
                onClick={() => handleTipSelect(tip.value)}
                className={`
          px-2 py-1 rounded-full text-sm font-semibold transition-all flex flex-row items-center gap-1
          ${
            selectedTip === tip.value
              ? 'bg-blue-600 text-white shadow-lg scale-110'
              : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
          }
            `}
              >
                <span className='text-lg mb-1'>{tip.emoji}</span>
                <span>{tip.label}</span>
              </button>
            </HoverCardTrigger>
            <HoverCardContent className='w-48 p-3'>
              <p className='text-sm text-gray-700'>{tip.description}</p>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
      <div className='w-full px-2 py-3'>
        <Slider
          defaultValue={[selectedTip]}
          value={[selectedTip]}
          onValueChange={(value) => handleTipSelect(value[0])}
          max={35}
          step={1}
        />
      </div>
    </motion.div>
  );
};

export default TipSection;
