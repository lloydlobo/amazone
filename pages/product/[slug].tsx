import axios from 'axios';
import { LeanDocument } from 'mongoose';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react'
import { toast } from 'react-toastify';
import FAQProduct from '../../components/FAQProduct';
import Layout from '../../components/Layout'
import { ProductType } from '../../components/ProductItem';
import RadioGroups from '../../components/RadioGroups';
import Product from '../../models/Product';
// import data from '../../utils/data';
import db from '../../utils/db';
import { Store } from '../../utils/Store';

/** 
* ProductScreen function.
*
*/
//  https://www.youtube.com/watch?v=63xprw4Ii5I
export default function ProductScreen(props: { product: ProductType }) {
    // From ServerSideProps.
    const { product } = props
    if (!product) {
        return (
            <Layout title={"404: Product Not Found"}>
                Product Not Found
            </Layout>
        )
    }

    const { state, dispatch } = useContext(Store as React.Context<any>)
    const router = useRouter()

    // Add items to the cart. UI in Layout.tsx.
    const addToCartHandler = async () => {
        // Have more than 1 item in cart.
        // Search with find in items of cart for products in a page.
        const existItem = state.cart.cartItems.find(function(x: { slug: string; }) {
            return x.slug === product.slug;
        })
        // If item is found (existItem), increment quantity by 1.
        const quantity = existItem ? existItem.quantity + 1 : 1

        // Send AJAX request form [id].ts backend server handler.
        const { data } = await axios.get(`/api/products/${product._id}`)
        // Make sure quantity is in the backend API.
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

        router.push('/cart')

        toast.success('Product added to the cart')
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
                        layout="responsive"
                        className='img-overlay'
                    />
                </div>

                <div className='product-info'>
                    <ul>
                        <li>
                            <h1 className='text-lg'>{product.name}</h1>
                        </li>
                        <li>
                            Category: {product.category}
                        </li>
                        <li>
                            Brand: {product.brand}
                        </li>
                        <li>
                            {product.rating} of {product.numReviews} reviews
                        </li>
                        <li>
                            Description: {product.description}
                        </li>
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
                            <div>
                                {
                                    product.countInStock > 0
                                        ? 'In stock'
                                        : 'Unavailable'
                                }
                            </div>
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

type serverSideProduct = {
    _id: string
    createdAt: string
    updatedAt: string
}
type serverSideProps = {
    props: { product: serverSideProduct }
}

/**
* getServerSideProps function gets products data from database.
*
* Run before rendering the component.
* Get products from Context set in index.tsx.
*/
// context: React.Context<any>
async function getServerSideProps(context: { params: any }): Promise<serverSideProps> {
    const { params } = context

    // Access the product url (slug) to determine params.
    const { slug } = params

    // Get data from MongoDB.
    await db.connect()
    const product: LeanDocument<any> = await Product.findOne({ slug }).lean()
    await db.disconnect()

    return {
        props: {
            product: product ? db.convertDocToObj(product) : null
        }
    }
}

export { getServerSideProps }

// ARCHIVE.
/* function getMockDataProduct() {
    const { query } = useRouter();
    const { slug } = query;
    const product = data.products.find(p => p.slug === slug);
    return product;
}
(() => { if (!props) {
        const product = getMockDataProduct()
        if (!product) { return <div>Product Not Found.</div>; }
    } })() */
