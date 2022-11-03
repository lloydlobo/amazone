import { createContext, useReducer } from 'react'
import Cookies from 'js-cookie'

// If you thought this should be optional, see
// https://github.com/DefinitelyTyped/DefinitelyTyped/pull/24509#issuecomment-382213106
let defaultContextValue: unknown;

export const Store = createContext(defaultContextValue as unknown)

export const COOKIE_KEY_CART = 'cart'

/**
* initialState populates history of cart items.
*
* Use js-cookie package to use browser cookies.
* Use json.parse to convert string 'cart' to 
* JS object, Cookies only store strings. 
* https://youtu.be/gJ5_Rx1S8zY
*/
const initialState = {
    cart: Cookies.get('cart')
        ? JSON.parse(Cookies.get(COOKIE_KEY_CART) as string)
        : { cartItems: [], shippingAddress: {} },
}

type CartState = {
    cart: {
        cartItems: {
            name: string;
            slug: string
        }[];
        shippingAddress: {
            location: {}
        },
        paymentMethod: string,
    }
}

// [Part 5: Handle Add to Cart] https://www.youtube.com/watch?v=YeiqNF9fLPw
// addToCartHandler action in pages/product/[slug].tsx.
function reducer(state: CartState, action: any): CartState {
    switch (action!.type) {
        case 'CART_ADD_ITEM': {
            const newItem = action.payload

            // Check if item exists and assign it to existItem.
            const existItem = state.cart.cartItems.find(
                (item: any) => item.slug === newItem.slug)

            // If exists keep items in cart item.
            // Else concatenate & push new items at the end.
            const cartItems = existItem
                ? state.cart.cartItems.map((item: { name: any; }) =>
                    item.name === existItem.name
                        ? newItem
                        : item)
                : [...state.cart.cartItems, newItem]

            // Set Cookies of 'cart' key for initialState() to read state.
            // Update cookie for card key, and convert JS Object to string.
            Cookies.set(COOKIE_KEY_CART, JSON.stringify({ ...state.cart, cartItems }))

            return {
                ...state,
                cart: { ...state.cart, cartItems }
            } as CartState

        }
        case 'CART_REMOVE_ITEM': {
            // Remove selected (payload X action) item from cart.
            const cartItems = state.cart.cartItems.filter((item: { slug: any; }) =>
                item.slug !== action.payload.slug
            )

            // Update cookie for card key, and convert JS Object to string.
            Cookies.set(COOKIE_KEY_CART, JSON.stringify({ ...state.cart, cartItems }))

            return {
                ...state,
                cart: { ...state.cart, cartItems }
            } as CartState
        }
        case 'CART_RESET': {
            return {
                ...state,
                cart: {
                    cartItems: [],
                    shippingAddress: { location: [] },
                    paymentMethod: '',
                }
            }
        }
        case 'SAVE_SHIPPING_ADDRESS': {
            return {
                ...state,
                cart: {
                    ...state.cart, // Keep same state for cartItems, and paymentMethods.
                    shippingAddress: {
                        ...state.cart.shippingAddress, // Keep shippingAddress as it is.
                        // Payload from ShippingScreen onSubmit() form values.
                        ...action.payload, // Merge address in payload with shipping address.
                    },
                }
            }
        }
        case 'SAVE_PAYMENT_METHOD': {
            return {
                ...state,
                cart: {
                    ...state.cart,
                    paymentMethod: action.payload,
                }
            }
        }
        default: {
            return state as CartState
        }
    } // end of switch.
}
/**
* StoreProvider is a React component. 
*
* An alternative to `useState`. 
*
* `useReducer` is usually preferable to `useState` when you have complex state logic that involves
* multiple sub-values. It also lets you optimize performance for components that trigger deep
* updates because you can pass `dispatch` down instead of callbacks.
*
* Call it in _app.tsx
*/
// overload where dispatch could accept 0 arguments.
export function StoreProvider({ children }: { children: any }): JSX.Element {
    // (alias) useReducer({ state, action }): void
    const [state, dispatch] = useReducer(reducer, initialState as never)

    const value = { state, dispatch }

    return (
        <Store.Provider value={value}>
            {children}
        </Store.Provider>
    )
}

