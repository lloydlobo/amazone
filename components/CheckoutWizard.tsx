import React from 'react'

export default function CheckoutWizard({ activeStep = 0 }) {
    return (
        <div className='mb-5 flex flex-wrap'>
            { // 0 , 1 , 2 , 3 (activeStep)
                ['User Login', 'Shipping Address', 'Payment Method', 'Place Order'].map(
                    (step, index) => (
                        // Set React key to avoid error in div.
                        <div
                            key={step}
                            className={
                                `flex-1 border-b-2 text-center 
                                    ${index <= activeStep                   // Increment border color to change.
                                    ? 'border-emerald-600 text-emerald-600' // If active.
                                    : 'border-gray-400 text-gray-400'       // If inactive.
                                }`
                            }
                        >
                            {step}
                        </div>
                    )
                )
            }
        </div >
    )
}
