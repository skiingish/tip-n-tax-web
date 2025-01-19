'use client';

import InputSection from '@/components/InputSection';
import ResultsSection from '@/components/ResultsSection';
import TipSection from '@/components/TipSection';
import { useState } from 'react';

export default function Home() {
  const [amount, setAmount] = useState<number>(0);
  const [tipAmount, setTipAmount] = useState<number>(18);

  return (
    <div className='flex flex-col lg:max-w-[30rem] w-[calc(100vw-2.5rem)] mx-auto gap-5'>
      <div className='pt-4'>
        <h1 className='text-2xl font-bold last:text-center text-white'>
          Tip N Tax - Canada
        </h1>
      </div>
      <InputSection onAmountChange={setAmount} />
      <TipSection onAmountChange={setTipAmount} />
      <ResultsSection baseAmount={amount} tipPercentage={tipAmount} />
    </div>
  );
}
