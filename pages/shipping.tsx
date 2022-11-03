import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import Cookies from 'js-cookie'

import { COOKIE_KEY_CART, Store } from '../utils/Store'
import CheckoutWizard from '../components/CheckoutWizard'
import Layout from '../components/Layout'

// FormValues type for useForm().
// https://react-hook-form.com/ts/
type FormValuesShipping = {
    fullName: string
    address: string
    city: string
    postalCode: string
    country: string
}

/**
* ShippingScreen React Functional component.
*
* It displays address fields and, saves address in Store Context 
* It is a part of CheckoutWizard component.
* Uses react-hook-form dependecy.
*/
// https://youtu.be/_IBlyR5mRzA?t=10752
export default function ShippingScreen(): JSX.Element {
    const {
        handleSubmit, register, formState: { errors }, setValue
    } = useForm<FormValuesShipping>()


    const { state, dispatch } = useContext<any>(Store as React.Context<any>)
    const { cart } = state
    const { shippingAddress } = cart

    // For redirecting to /shipping page after onSubmit success.
    const router = useRouter();

    // Fill input element value, based on data;
    // in shipping address in the given Context.
    useEffect((): void => {
        if (shippingAddress) {
            setValue('fullName', shippingAddress.fullName)
            setValue('address', shippingAddress.address)
            setValue('city', shippingAddress.city)
            setValue('postalCode', shippingAddress.postalCode)
            setValue('country', shippingAddress.country)
        } // setValue('fullName', shippingAddress.ShippingAddressFormValues["fullName"])
    }, [setValue, shippingAddress]) // end of useEffect().

    // onSubmit handles submission of form values.
    const onSubmit: SubmitHandler<FormValuesShipping> = ({
        fullName, address, city, postalCode, country
    }: FormValuesShipping) => {
        // Dispatch payload to Store reducer() in Context.
        dispatch({
            type: 'SAVE_SHIPPING_ADDRESS', // case.
            payload: { fullName, address, city, postalCode, country },
        })
        // After updating Store in Context, save in Cookies.
        // Refereshing page doesn't delete data as address-
        // is stored in shipping history by js-cookie and React.Context
        Cookies.set(
            COOKIE_KEY_CART,
            JSON.stringify({
                ...cart,
                shippingAddress: {
                    fullName,
                    address,
                    city,
                    postalCode,
                    country,
                } as FormValuesShipping
            })
        )
        // If ShippingScreen form submit is a success,
        // then redirect to /payment page.
        router.push('/payment')
    } // end of onSubmit() handler.

    return (
        <Layout title={"Shipping Address"}>
            <CheckoutWizard activeStep={1} />
            <form
                className='mx-auto max-w-screen-md'
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className='mb-4 text-xl'>Shipping Address</h1>

                <div className='mb-4'>
                    <label htmlFor='fullName'>Full Name</label>
                    <input
                        className='w-full'
                        id='fullName'
                        autoFocus
                        placeholder='John Doe'
                        {...register('fullName',
                            { required: 'Please enter full name.' }
                        )}
                    />
                    {
                        errors?.fullName && (
                            <div className="text-red-500">
                                {errors.fullName.message}
                            </div>
                        )
                    }
                </div>

                <div className='mb-4'>
                    <label htmlFor='address' placeholder='101 Boulevard Yard'>Address</label>
                    <input
                        className='w-full'
                        id='address'
                        placeholder='1001, 11 Boulevard Est'
                        autoFocus
                        {...register('address',
                            {
                                required: 'Please enter shipping address.',
                                minLength: { value: 3, message: 'Address is more than 2 chars.' },
                            },
                        )}
                    />
                    {
                        errors?.address && (
                            <div className="text-red-500" >
                                {errors.address.message}
                            </div>
                        )
                    }
                </div>

                <div className='mb-4'>
                    <label htmlFor='city'>City</label>
                    <input
                        className='w-full'
                        id='city'
                        autoFocus
                        placeholder='Montreal'
                        {...register('city', { required: 'Please enter city' },)}
                    />
                    {
                        errors?.city && (
                            <div className="text-red-500">
                                {errors.city.message}
                            </div>
                        )
                    }
                </div>

                <div className='mb-4'>
                    <label htmlFor='postalCode'>Postal Code</label>
                    <input
                        className='w-full'
                        id='postalCode'
                        autoFocus
                        placeholder='H4Z268'
                        {...register('postalCode', { required: 'Please enter postal code' },)}
                    />
                    {
                        errors?.postalCode && (
                            <div className="text-red-500">
                                {errors.postalCode.message}
                            </div>
                        )
                    }
                </div>

                <div className='mb-4'>
                    <label htmlFor='country'>Country</label>
                    <input
                        className='w-full'
                        id='country'
                        autoFocus
                        placeholder='Canada'
                        {...register('country', { required: 'Please enter country' },)}
                    />
                    {
                        errors?.country && (
                            <div className="text-red-500">
                                {errors.country.message}
                            </div>
                        )
                    }
                </div>

                <div className='mb-4 flex justify-between'>
                    <button className='primary-button'>
                        Next
                    </button>
                </div>
            </form>
        </Layout>
    )
}

// Protected page only accessed by users logged-in.
ShippingScreen.auth = true

