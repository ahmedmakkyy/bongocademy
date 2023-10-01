import React from 'react';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { useLocation } from 'react-router-dom';

const Payment = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const price = queryParams.get('price');
    //   const className = queryParams.get('name');
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
    return (
        <div className='m-5'>
            <div>
                <h1 className="text-2xl font-bold mb-8 text-yellow-500 relative border-l-4 pl-2 border-emerald-500">
                    Payment
                </h1>
            </div>
            <div className="bg-gray-500 p-5 bg-opacity-20">
            <p className='font-semibold text-emerald-500'>Amount To Pay: {price}</p>
            <Elements stripe={stripePromise}>
                <CheckoutForm price={price}>

                </CheckoutForm>
            </Elements>
            </div>


        </div>
    );
};

export default Payment;