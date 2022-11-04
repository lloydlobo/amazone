import { toast } from 'react-toastify'
import db from '../utils/db'
import Layout from '../components/Layout'
import { ProductItem, ProductType } from '../components/ProductItem'
import Product from '../models/Product'
import axios from 'axios'
import { useContext } from 'react'
import { Store } from '../utils/Store'
// import data from '../utils/data'

/**
* Home().
*
* Note: Destructure parameters.
*/
export default function Home({ products }: {
    products: ProductType[]
}): JSX.Element {

    const { state, dispatch } = useContext(Store as React.Context<any>)
    const { cart } = state

    /**
    * onSubmit button handler. 
    *
    */
    const addToCartHandler = async (product: any) => {
        const existItem = cart.cartItems.find(
            (x: { slug: any }) => x.slug === product.slug
        )
        const quantity = existItem ? existItem.quantity + 1 : 1

        const { data } = await axios.get(`/api/products/${product._id}`)

        // Dispatch to Store.
        dispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...product }, quantity
        })

        // If out of stock.
        if (data.countInStock < quantity) {
            return toast.error(`Sorry. Product ${product.name} is out of stock`)
        }

        toast.success(`Product ${product.name} added to the cart`)
    } // end of addToCartHandler().

    return (
        <Layout title={"Home page"}>
            <div
                className='grid gap-4 grid-cols-1 max-[424px]:grid-cols-1 
                min-[425px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            >
                { // data.products.map((product) => (   // for mock test.
                    products.map((product: ProductType) => (
                        < ProductItem
                            key={product.slug}
                            product={product}
                            addToCartHandler={addToCartHandler}
                        ></ProductItem>
                    ))
                }
            </div>
        </Layout >
    )
}

type serverProps = {
    products: {
        _id: string; createdAt: string; updatedAt: string
    }[]
}

/**
* getServerSideProps function gets products data from database.
*
* Run before rendering the component.
* Product.find().lean() => MongoDB Doc i.e. non-JSON object. 
*
* db.convertDocToObj func serializes Doc to JSON.
*/
// https://youtu.be/_IBlyR5mRzA?t=12375
async function getServerSideProps(): Promise<{ props: serverProps }> {
    await db.connect()

    // Sets the lean option to get collection instead of metadata.
    const products = await Product.find().lean()

    return {
        props: {
            products: products.map(db.convertDocToObj),
        }
    }
}

export { getServerSideProps }

