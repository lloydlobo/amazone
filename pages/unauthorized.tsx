import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../components/Layout'

/** 
* Unauthorized rfc is redirected to when unauthorized user, 
* tries to access ShippingScreen or any protected pages. 
* 
* This redirect helps to avoid known unauthorized detours.
* onClick={() => router.push('login?redirect=/shipping')}
*/
export default function Unauthorized() {
    const router = useRouter()
    const { message } = router.query

    return (
        <Layout title={"Unauthorized Page"}>
            <h1 className='text-xl'>Access Denied</h1>
            {/* Get message from query string. */}
            {message &&
                <div className='mb-4 text-red-500' >
                    {message}
                </div>
            }

        </Layout >
    )
}
