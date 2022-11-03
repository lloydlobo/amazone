import Link from 'next/link'
import React from 'react'

// Product type.
export type ProductType = {
    name: string
    slug: string
    category: string
    image: string
    price: number
    brand: string
    rating: number
    numReviews: number
    countInStock: number
    description: string
    _id?: string
    createdAt?: string
    updatedAt?: string
}

/**
* ProductItem().
*
* Since img tag is used instead of Image component. 
*/
/* eslint-disable @next/next/no-img-element */
export function ProductItem({
    product,
    addToCartHandler
}: {
    product: ProductType,
    addToCartHandler: any
}
): JSX.Element {

    return (
        <>
            <div className='card'>
                <Link href={`/product/${product.slug}`}>
                    <div className='img-overlay'>
                        <img
                            className="rounded shadow brightness-90"
                            src={product.image}
                            alt={product.name}
                        />
                    </div>
                </Link>

                <div className='flex flex-col items-center justify-center p-5'>
                    <Link href={`/product/${product.slug}`}>
                        <h2 className='text-lg'>{product.name}</h2>
                    </Link>

                    <p className="mb-2">{product.brand}</p>
                    <p className="">${product.price}</p>
                    <button
                        onClick={() => addToCartHandler(product)}
                        className='primary-button'
                        type='button'
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </>
    )
}

// {{// https://stackoverflow.com/questions/11535392/how-to-decrease-image-brightness-in-css}}
