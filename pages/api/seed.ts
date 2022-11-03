// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../models/User'
import data from '../../utils/data'
import db from '../../utils/db'

// https://tecadmin.net/install-mongodb-on-fedora/
type Data = {
    message: string,
}

async function handler(
    _req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    await db.connect()

    // Delete all previous users in user collections.
    await User.deleteMany()
    // Add sample users.
    await User.insertMany(data.users)

    // Disconnect after inserting sample users.
    await db.disconnect()
    // Send confirmation response.
    res.send({ message: 'seeded successfully', })
}

// Export explicitly to handle TypeError: resolver is not a function.
//
// https://stackoverflow.com/a/60250115
export default handler

/*
next-tailwind-amazone.users

{
  "_id": {
    "$oid": "6360a400340ad4c529bdbf97"
  },
  "name": "John",
  "email": "admin@example.com",
  "password": "000000",
  "isAdmin": false,
  "__v": 0,
  "createdAt": {
    "$date": {
      "$numberLong": "1667277824068"
    }
  },
  "updatedAt": {
    "$date": {
      "$numberLong": "1667277824068"
    }
  }
} */
