'use client';
export default function Info() {
  return (
    <div className='p-4 lg:max-w-[30rem] w-[calc(100vw-2.5rem)] mx-auto text-white'>
      <h1 className='text-2xl font-bold mb-4 mt-6 text-center'>App Info</h1>
      <p className='mb-4'>
        This app allows you to enter an amount, such as one from a retail store,
        or adjust for a tip in a service industry and then see the resulting
        amount including tax and tip.
      </p>
      <h1 className='text-2xl font-bold my-6 text-center'>Taxes In Canada</h1>
      <p className='mb-4'>
        Each province and territory in Canada has its own sales tax rate.
      </p>
      <p className='mb-4'>
        The amount you see in retail stores or on your bill will nearly always
        be before tax. The tax will be added afterwards.
      </p>
      <h1 className='text-2xl font-bold my-6 text-center'>Tipping</h1>
      <p className='mb-4'>
        In Canada, tipping is a common practice in many service industries,
        including restaurants, bars and services such as hairdressing etc. The
        standard tipping rate is usually between 15% to 20% of the total bill
        before taxes.
      </p>
      <p className='mb-4'>
        Tipping is not mandatory everywhere, such as fast food restaurants or
        take-out services.
      </p>

      <h1 className='text-2xl font-bold my-6 text-center'>Conversions</h1>
      <p className='mb-4'>
        The app will convert the amount to your home currency if you have set
        it, using the exchange rate (refreshed twice a day).
      </p>
      <p className='mb-4'>
        Note: Your financial institution may charge a fee for currency
        conversion, and may give a higher rate than the current exchange rate.
      </p>
    </div>
  );
}
