import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'

import Cookies from 'js-cookie'

import Layout from '../components/Layout'
import CheckoutWizard from '../components/CheckoutWizard'
import { COOKIE_KEY_CART, Store } from '../utils/Store'
import { toast } from 'react-toastify'

/**
 * Payment().
 *
 */
// https://youtu.be/_IBlyR5mRzA?t=11473
export default function PaymentScreen(): JSX.Element {
    const paymentMethodsAvailable: string[] = ['Paypal', 'Stripe', 'CashOnDelivery']
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')

    const { state, dispatch } = useContext<any>(Store as React.Context<any>)
    const { cart } = state
    const { shippingAddress, paymentMethod } = cart

    const router = useRouter()

    // onSubmit function handles Next button click event.
    const onSubmit = (e: any) => {
        e.preventDefault()
        // Alert user if payment method is not selected.
        if (!selectedPaymentMethod) {
            return toast.error('Payment method is required!')
        }
        // Dispatch input to Store reducer().
        dispatch({
            type: 'SAVE_PAYMENT_METHOD', // Case.
            payload: (selectedPaymentMethod as string),
        })
        // Save session's browser data in js-cookie key 'cart'.
        Cookies.set(
            COOKIE_KEY_CART,
            JSON.stringify({
                ...cart,
                paymentMethod: selectedPaymentMethod,
            })
        )
        // Redirect succesfully to final CheckoutWizard page.
        router.push('/placeorder')
    }

    useEffect((): void => {
        if (shippingAddress) {
            // Redirect to /payment, if prior stage is not validated.
            if (!shippingAddress.address) {
                return (() => {
                    router.push('/shipping')
                })() as void
            } else {
                // Set state to methos if selected, or assign empty string.
                setSelectedPaymentMethod(paymentMethod || '')
            }
        }
    }, [paymentMethod, router, shippingAddress.address])

    return (
        <Layout title={"Payment Method"}>
            <CheckoutWizard activeStep={2} />
            <form
                className='mx-auto max-w-screen-md'
                // No react hook for simple radio input submit.
                onSubmit={onSubmit}
            >
                <h1 className='mb-4 text-xl'>Payment Method</h1>
                {
                    paymentMethodsAvailable.map((payment) => (
                        <div key={payment} className="mb-4">
                            <input
                                name='paymentMethod'
                                className='p-2 outline-indigo-300 outline-offset-1 focus:ring-0'
                                id={payment}
                                type='radio'
                                checked={selectedPaymentMethod === payment}
                                onChange={() => setSelectedPaymentMethod(payment)}
                            />

                            <label className='p-2' htmlFor={payment}>
                                {payment}
                            </label>
                        </div>
                    ))
                }

                <div className='flex mb-4 justify-between'>
                    <button
                        onClick={() => router.push('/shipping')}
                        type='button'
                        className='default-button'
                    >
                        Back
                    </button>
                    <button className='primary-button'>
                        Next
                    </button>
                </div>
            </form>
        </Layout >
    )
}

// Protected page only accessed by users logged-in.
PaymentScreen.auth = true

