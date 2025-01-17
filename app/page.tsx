'use client';

import InputSection from '@/components/InputSection';
import LocationSelection from '@/components/LocationSelection';
import ResultsSection from '@/components/ResultsSection';
import TipSection from '@/components/TipSection';
import { useState } from 'react';

export default function Home() {
  const [amount, setAmount] = useState<number>(0);
  const [tipAmount, setTipAmount] = useState<number>(18);

  return (
    <div className='flex flex-col w-[80%] mx-auto gap-6'>
      <div className='pt-4'>
        <h1 className='text-2xl font-bold last:text-center text-white'>
          Tip N Tax
        </h1>
      </div>
      <InputSection onAmountChange={setAmount} />
      <TipSection onAmountChange={setTipAmount} />
      <ResultsSection
        baseAmount={amount}
        tipPercentage={tipAmount}
        taxRate={0.1}
      />
    </div>
  );
}
