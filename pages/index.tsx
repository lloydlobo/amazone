import { toast } from 'react-toastify'
import db from '../utils/db'
import Layout from '../components/Layout'
import { ProductItem, ProductType } from '../components/ProductItem'
import Product from '../models/Product'
import data from '../utils/data'

/**
* Home().
*
*/
export default function Home(products: any) {
    const addToCartHandler = async (product: any) => {
        toast.success(`Product ${product.name} was added to the cart`)
    }
    console.log(products)

    return (
        <Layout title={"Home page"}>
            <div
                className='grid gap-4 grid-cols-1 max-[424px]:grid-cols-1 
                min-[425px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            >
                {
                    data.products.map((product) => (   // for mock test.
                        // (products).map((product: ProductType) => (
                        < ProductItem
                            key={product.slug}
                            product={product}
                            addToCartHandler={addToCartHandler}
                        />
                    ))
                }
            </div>
        </Layout >
    )
}

type serverProps = {
    products: {
        _id: string;
        createdAt: string;
        updatedAt: string
    }[]
}

/**
* getServerSideProps function gets products data from database.
*
* Run before rendering the component.
* Return MongoDB Doc i.e. non-JSON object. Needs to be parsed.
*/
// props: { products: { _id: string; createdAt: string; updatedAt: string }[] }
export async function getServerSideProps(): Promise<{ props: serverProps }> {
    await db.connect()
    // Sets the lean option to get collection instead of metadata.
    const products = await Product.find().lean()
    return {
        props: {
            products: products.map(db.convertDocToJSON),
        }
    }
}
// export { getServerSideProps }
