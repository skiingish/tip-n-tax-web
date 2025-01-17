'use client';

import { useSettingsStore } from '@/store/settings.store';
import { currencies } from '@/lib/constants/currencies';
import { calculationUtils } from '@/lib/taxCalculation';
import { useLocationStore } from '@/store/location.store';
import taxRateCaLookup from '@/lib/constants/canadaTaxLookup';

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
}) => (
  <div
    className={`flex flex-row items-center py-3 ${
      highlighted ? 'font-semibold' : ''
    }`}
  >
    <span className='flex-1 text-white'>{label}</span>
    <span className={`text-white ${highlighted ? 'text-lg' : ''}`}>
      {isPercentage ? `${value.toFixed(1)}%` : `$${value.toFixed(2)}`}
    </span>
  </div>
);

const ResultsSection: React.FC<ResultsSectionProps> = ({
  baseAmount,
  tipPercentage,
  amountIncludesTax = false,
}) => {
  const { currency, setCurrency } = useSettingsStore();
  const { province } = useLocationStore();
  const taxRate = taxRateCaLookup(province) / 100;
  const currentCurrency =
    currencies.find((c) => c.code === currency) || currencies[0];
  const alternativeCurrency = currency === 'AUD' ? 'CAD' : 'AUD';

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
    <div className='divide-y divide-gray-200'>
      <div className='flex flex-row items-center mb-2 justify-center'>
        <span className='text-white text-md font-semibold mr-2'>AUD</span>
        <label className='relative inline-flex items-center cursor-pointer'>
          <input
            type='checkbox'
            className='sr-only peer'
            checked={currency === 'CAD'}
            onChange={(e) => setCurrency(e.target.checked ? 'CAD' : 'AUD')}
          />
          <div
            className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer 
            peer-checked:after:translate-x-full peer-checked:after:border-white 
            after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
            after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all
            peer-checked:bg-red-600"
          ></div>
        </label>
        <span className='text-white text-md font-semibold ml-2'>CAD</span>
      </div>

      <ResultsRow label='Base Amount' value={calculatedBase} />
      <ResultsRow
        label={`${province} Tax`}
        value={taxRate * 100}
        isPercentage
      />
      <ResultsRow label='Tax Amount' value={taxAmount} />
      <ResultsRow
        label='Total (incl. tax)'
        value={calculatedBase + taxAmount}
        highlighted
      />
      <ResultsRow label='Tip Amount' value={tipAmount} />
      <ResultsRow label='Grand Total' value={totalAmount} highlighted />
    </div>
  );
};

export default ResultsSection;
