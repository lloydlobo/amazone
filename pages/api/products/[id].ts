import type { NextApiRequest, NextApiResponse } from 'next'
import db from "../../../utils/db"
import Product from "../../../models/Product"
import { LeanDocument } from 'mongoose'

/**
* handler function to handle backend server API.
* Send Products from MongoDB.
*
* Sends AJAX reponse to axios get request,
* in url /api/products/${product._id}.
*/
// https://youtu.be/_IBlyR5mRzA?t=12639
async function handler(
    req: NextApiRequest,
    res: NextApiResponse<LeanDocument<any> | null>
) {
    await db.connect()

    // Setup response to AJAX request in [slug].tsx frontend.
    const product = await Product.findById(req.query.id) as LeanDocument<any> | null

    await db.disconnect()

    // If product is not found or null respond with 404.
    // Else return the product in response 200.
    if (!product) {
        res.status(404) // Not Found.
        res.send(null)
    } else {
        res.status(200) // OK.
        res.send(product)
    }
}

export { handler }
