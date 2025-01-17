'use client';

import { useSettingsStore } from '@/store/settings.store';
import { calculationUtils } from '@/lib/taxCalculation';
import { useLocationStore } from '@/store/location.store';
import taxRateCaLookup from '@/lib/constants/canadaTaxLookup';
import { useEffect, useState } from 'react';
import { useRatesStore } from '@/store/exchangeRates.store';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from './ui/button';
import { ChevronsDown } from 'lucide-react';

interface ResultsSectionProps {
  baseAmount: number;
  tipPercentage: number;
  amountIncludesTax?: boolean;
}

interface ResultsRowProps {
  label: string;
  value: number;
  isPercentage?: boolean;
  highlighted?: boolean;
}

const ResultsRow: React.FC<ResultsRowProps> = ({
  label,
  value,
  isPercentage = false,
  highlighted = false,
}) => {
  const formattedValue = isPercentage
    ? `${value.toFixed(1)}%`
    : `$${value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;

  return (
    <div className='w-full'>
      <div
        className={`flex flex-row items-center py-3 ${
          highlighted ? 'font-semibold' : ''
        }`}
      >
        <span className='flex-1 text-white'>{label}</span>
        <span className={`text-white ${highlighted ? 'text-lg' : ''}`}>
          {formattedValue}
        </span>
      </div>
      <hr className='border-t border-gray-200/30' />
    </div>
  );
};

const ResultsSection: React.FC<ResultsSectionProps> = ({
  baseAmount,
  tipPercentage,
  amountIncludesTax = false,
}) => {
  const { currency } = useSettingsStore();
  const { province } = useLocationStore();
  const taxRate = taxRateCaLookup(province) / 100;

  const { rates, isLoading, error, fetchRatesIfStale } = useRatesStore();
  const [displayInHomeCurrency, setDisplayInHomeCurrency] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Check the rates if the currency is changed, checks for new rates if the ones we have are stale.
  useEffect(() => {
    fetchRatesIfStale();
  }, [displayInHomeCurrency]);

  const convertAmount = (amount: number): number => {
    if (!displayInHomeCurrency) return amount;
    if (isLoading || error) return 0;
    if (currency === 'CAD' || !rates[currency]) return amount;
    return amount * rates[currency];
  };

  const {
    baseAmount: calculatedBase,
    taxAmount,
    tipAmount,
    totalAmount,
  } = calculationUtils.calculateTotal(
    baseAmount,
    taxRate,
    tipPercentage,
    amountIncludesTax
  );

  return (
    <div
      className=' bg-gradient-to-b from-blue-600 to-blue-500/90 
    rounded-3xl shadow-[0px_10px_25px_-5px_rgb(59_130_246_/_0.3)] pt-5 pb-6 px-4'
    >
      <div className='flex flex-row items-center mb-2 justify-center'>
        <span className='text-white text-md font-semibold mr-2'>CAD</span>
        <label className='relative inline-flex items-center cursor-pointer'>
          <input
            type='checkbox'
            className='sr-only peer'
            checked={displayInHomeCurrency}
            onChange={(e) => setDisplayInHomeCurrency(e.target.checked)}
          />
          <div
            className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer 
            peer-checked:after:translate-x-full peer-checked:after:border-white 
            after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
            after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all
            peer-checked:bg-red-600"
          ></div>
        </label>
        <span className='text-white text-md font-semibold ml-2'>
          {currency}
        </span>
      </div>

      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleContent>
          <ResultsRow
            label='Base Amount'
            value={convertAmount(calculatedBase)}
          />
          <ResultsRow
            label={`${province} Tax`}
            value={taxRate * 100}
            isPercentage
          />
          <ResultsRow label='Tax Amount' value={convertAmount(taxAmount)} />
          <ResultsRow
            label='Total (incl. tax)'
            value={convertAmount(calculatedBase + taxAmount)}
            highlighted
          />
        </CollapsibleContent>
        <ResultsRow label='Tip Amount' value={convertAmount(tipAmount)} />
        <ResultsRow
          label='Grand Total'
          value={convertAmount(totalAmount)}
          highlighted
        />
        <CollapsibleTrigger asChild>
          <div className='flex justify-center pt-5'>
            <Button
              variant='ghost'
              size='sm'
              className=' flex items-center rounded-full justify-center bg-blue-100 gap-2 hover:bg-blue-200 transition-colors'
            >
              <ChevronsDown
                className={`h-4 w-4 transition-transform duration-500 text-blue-600 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
              <span className=' text-blue-600'>
                {isOpen ? 'Show Less' : 'Show More'}
              </span>
            </Button>
          </div>
        </CollapsibleTrigger>
      </Collapsible>
    </div>
  );
};

export default ResultsSection;
