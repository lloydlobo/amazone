import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react'
import FAQProduct from '../../components/FAQProduct';
import Layout from '../../components/Layout'
import RadioGroups from '../../components/RadioGroups';
import data from '../../utils/data';
import { Store } from '../../utils/Store';

//  https://www.youtube.com/watch?v=63xprw4Ii5I

/** 
* ProductScreen function.
*
*/
export default function ProductScreen() {
    const { state, dispatch } = useContext(Store as React.Context<any>)

    const { query } = useRouter()
    const { slug } = query

    const product = data.products.find(p => p.slug === slug)
    if (!product) {
        return <div>Product Not Found.</div>
    }

    // Add items to the cart.
    // UI in Layout.tsx.
    const addToCartHandler = async () => {
        // Have more than 1 item in cart.
        // Search with find in items of cart for products in a page.
        const existItem = state.cart.cartItems.find((x: { slug: string; }) =>
            x.slug === product.slug)

        // If item is true and found (existItem), 
        // then set and increarse the quantity.
        const quantity = existItem ? existItem.quantity + 1 : 1

        if (product.countInStock < quantity) {
            alert('Sorry. Product is out of stock.')
            return
        }

        // Use context defined in StoreProvider inside Store.tsx.
        // payload contains all product properties and a single quantity.
        dispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...product, quantity } // quantity: 1 (without state.cart....)
        })

    } // end of addToCartHandler().

    return (
        <Layout title={product.name}>
            <div className='py-2'>
                <Link href={"/"}>back to products</Link>
            </div>
            <div className='grid md:grid-cols-4 md:gap-3'>
                <div className='md:col-span-2'>
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={640}
                        height={640}
                        // layout="responsive"
                        className='img-overlay'
                    ></Image>
                </div>

                <div className='product-info'>
                    <ul>
                        <li><h1 className='text-lg'>{product.name}</h1></li>
                        <li>Category: {product.category}</li>
                        <li>Brand: {product.brand}</li>
                        <li>{product.rating} of {product.numReviews} reviews</li>
                        <li>Description: {product.description}</li>
                    </ul>
                    <RadioGroups />
                    <FAQProduct />
                </div>

                <div className='product-cart-action'>
                    <div className='card p-5'>
                        <div className='mb-2 flex justify-between'>
                            <div>Price</div>
                            <div>${product.price}</div>
                        </div>

                        <div className='mb-2 flex justify-between'>
                            <div>Status</div>
                            <div>{product.countInStock > 0 ? 'In stock' : 'Unavailable'}</div>
                        </div>

                        <button
                            className='primary-button w-full'
                            onClick={addToCartHandler}
                        >
                            Add to cart
                        </button>
                    </div>
                </div> {/* end of product-cart-action */}
            </div> {/* end of grid */}
        </Layout>
    )
}
