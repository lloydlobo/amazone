import React from 'react';
import { SessionProvider, useSession } from 'next-auth/react'
import { StoreProvider } from '../utils/Store';
import { useRouter } from 'next/router'
import '../styles/globals.css'

/**
* App().
*
* In the latest release of next.js v12.3.0`, https://github.com/vercel/next.js/releases#:~:text=Compare-,v12.3.0,-Latest,
* The interface AppProps takes a generic for pageProps as shown in the details of this merged PR (https://github.com/vercel/next.js/pull/38867)
*/
// * https://stackoverflow.com/a/73710759
function App({ Component, pageProps: { session, ...pageProps } }) {
    return (
        // <SessionProvider session={pageProps.session}>
        <SessionProvider session={session}>
            < StoreProvider >
                {Component.auth ? (
                    // If authorized Wrap with Auth(). 
                    <Auth>
                        <Component {...pageProps} />
                    </Auth>
                ) : (
                    // Else Redirect to /unauthorized page.
                    <Component {...pageProps} />
                )}

            </StoreProvider >
        </SessionProvider >
    )
}

/** 
* Auth function authorizes gateway to shipping address.
* 
* Fix accessing Shipping Address for all users,
* Whetere user is Logged in or out. 
*/
function Auth({ children }) {
    const router = useRouter()

    const { status } = useSession({
        // Only logged in users can access it (shipping.tsx).
        required: true,
        // For unauthorized users redirect to /unauthorized page.
        onUnauthenticated() {
            router.push('/unauthorized?message=login required')
        }
    })

    if (status === 'loading') {
        return (<div>Loading ...</div>)
    }
    return (<>{children}</>)
}

export default App

// function App({ Component, pageProps }: AppProps<{ session: Session }>): JSX.Element {
