import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { XCircleIcon } from '@heroicons/react/outline';
import { toast } from 'react-toastify';

/** 
* CartScreen().
*
* Server side: Cart items = 0, client side is > 0 for most cases. via js-cookie.
* so fix with useState() in Layout.tsx
*
* dynamic package renders cart state in the client side, 
* as deleting and refreshing items throws error. 
* Item isn't present on server side, but it's slug is present in client side. 
*
* https://github.com/basir/next-tailwind-amazona/blob/main/pages/cart.js 
*/
function CartScreen(): JSX.Element {
    const router = useRouter();
    const { state, dispatch } = useContext(Store as React.Context<any>);
    const { cart: { cartItems }, } = state

    const updateCartHandler = async (item: any, qty: string): Promise<any> => {
        const quantity = Number(qty)
        const { data } = await axios.get(`/api/products/${item._id}`)

        if (data.countInStock < quantity) {
            return toast.error('Sorry. Product is out of stock.')
        }
        // Dispatch destructured spread items, 
        // and quantity selected by use.
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } })

        toast.success('Product updated in the cart.')
    } // end of updateCartHandler().

    const removeItemHandler = (item: any): void => {
        dispatch({
            type: 'CART_REMOVE_ITEM',
            payload: item
        })
    } // end of removeItemHandler().

    return (<Layout title={"Shopping Cart"}  >
        <h1 className='mb-4 text-xl'>Shopping Cart</h1>
        {cartItems.length === 0
            ? (
                <div>
                    Cart is empty.&nbsp;<Link href={"/"}>Go Shopping</Link>
                </div>
            )
            : (
                <div className='grid md:grid-cols-4 md:gap-5'>
                    <div className='overflow-x-auto md:col-span-3'>
                        <table className='min-w-full'>
                            <thead className='border-b'>
                                <tr>
                                    <th className='p-5 text-left'>Item</th>
                                    <th className='p-5 text-right'>Quantity</th>
                                    <th className='p-5 text-right'>Price</th>
                                    <th className='p-5'>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {cartItems.map((item: any) => (
                                    <tr key={item.slug} className="border-b">
                                        <td>
                                            <Link href={`product/${item.slug}`}>
                                                <div className='flex items-center'>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        width={50}
                                                        height={50}
                                                    ></Image>
                                                    &nbsp;{item.name}
                                                </div>
                                            </Link>
                                        </td>

                                        <td className='p-5 text-right'>
                                            <select
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    updateCartHandler(item, e.target.value)
                                                }
                                            > { /* Fragments <> allow <select> to have multiple childen. */}
                                                <>{ // Using --downlevelIteration flag to iterate.
                                                    [...Array(item.countInStock as number).keys()].map(
                                                        (x) => (
                                                            <option key={x + 1} value={x + 1} >
                                                                {x + 1}
                                                            </option>
                                                        )
                                                    )}
                                                </>
                                            </select>
                                        </td>{/* end of select quantity. */}

                                        <td className='p-5 text-right'>
                                            ${item.price}
                                        </td>

                                        <td className='p-5 text-center'>
                                            <button
                                                className=''
                                                onClick={() => removeItemHandler(item)}
                                            >
                                                <XCircleIcon className='h-5 w-5'></XCircleIcon>
                                            </button>
                                        </td>

                                    </tr> // end of tr (table row). 
                                    //  end of cartItems.map().
                                ))}
                            </tbody>
                        </table>
                    </div> {/* end of div overflow. */}

                    <div className='card p-5'>
                        <ul>
                            <li> {/* Subtotal (6) : $420 */}
                                <div className='pb-3 text-xl'>
                                    Subtotal (
                                    {
                                        cartItems.reduce(function(a: number, c: { quantity: number; }) {
                                            return a + c.quantity;
                                        }, 0)
                                    }
                                    ) : $
                                    {
                                        cartItems.reduce(function(a: number, c: { quantity: number; price: number; }) {
                                            return a + c.quantity * c.price;
                                        }, 0)
                                    }
                                </div>
                            </li>

                            <li>
                                <button
                                    // Check auth of user in /login. If user is logged in,
                                    // then redirect to /shipping. Else take to login.
                                    onClick={() => router.push('login?redirect=/shipping')}
                                    className='primary-button w-full'
                                >
                                    Check Out
                                </button>
                            </li>
                        </ul>
                    </div> {/* end of div card. */}
                </div> // end of div grid.
            )
        }
    </Layout >) // end of return.
} // end of CartScreen().

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false })

// Footnotes: 
// 
// Fragments for multiple childrens.
// https://stackoverflow.com/a/72783450
