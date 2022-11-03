// https://stackoverflow.com/a/71437210 & https://stackoverflow.com/a/65708577
//
// const {bcrypt} = require('bcryptjs'); means grabbing a property called bcrypt inside of bcryptjs, which is not available.
// you only do destructuring const { isEmail } = require("validator"); when isEmail is one of the properties in validator.
// import * as bcrypt from "bcryptjs";
import bcrypt from "bcryptjs";

// data store object contains user, products...
//
// email needs to be unique.
//
// https://github.com/basir/next-tailwind-amazona/blob/main/utils/data.js
// [Part 9 Connect To MongoDB] https://youtu.be/7W4vja9Ax-0
const data = {
    users: [
        {
            name: 'John',
            email: 'admin@example.com',
            password: bcrypt.hashSync('000000'),
            isAdmin: true,
        },
        {
            name: 'Jane',
            email: 'user@example.com',
            password: bcrypt.hashSync('1242342342'),
            isAdmin: false,
        },
    ],
    products: [
        {
            name: 'Free Shirt',
            slug: 'free-shirt',
            category: 'Shirts',
            image: '/images/shirt1.jpg',
            price: 70,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 8,
            countInStock: 20,
            description: 'A popular free shirt',
        },
        {
            name: 'Fit Shirt',
            slug: 'fit-shirt',
            category: 'Shirts',
            image: '/images/shirt2.jpg',
            price: 80,
            brand: 'Adidas',
            rating: 3.2,
            numReviews: 10,
            countInStock: 20,
            description: 'A popular fit shirt',
        },
        {
            name: 'Slim Shirt',
            slug: 'slim-shirt',
            category: 'Shirts',
            image: '/images/shirt3.jpg',
            price: 90,
            brand: 'Raymond',
            rating: 4.5,
            numReviews: 3,
            countInStock: 20,
            description: 'A popular slim shirt',
        },
        {
            name: 'Golf Pants',
            slug: 'golf-pants',
            category: 'Pants',
            image: '/images/pants1.jpg',
            price: 90,
            brand: 'Oliver',
            rating: 2.9,
            numReviews: 13,
            countInStock: 20,
            description: 'Smart looking golf pant',
        },
        {
            name: 'Fit Pants',
            slug: 'fit-pants',
            category: 'Pants',
            image: '/images/pants2.jpg',
            price: 95,
            brand: 'Zara',
            rating: 3.5,
            numReviews: 7,
            countInStock: 20,
            description: 'A popular fit pant',
        },
        {
            name: 'Classic Pants',
            slug: 'classic-pants',
            category: 'Pants',
            image: '/images/pants3.jpg',
            price: 75,
            brand: 'Casely',
            rating: 2.4,
            numReviews: 14,
            countInStock: 20,
            description: 'A popular classic pant',
        },
    ],
}

export default data

// {
//   "_id": {
//     "$oid": "6360a726340ad4c529bdbfbc"
//   },
//   "name": "John",
//   "email": "admin@example.com",
//   "password": "$2a$10$rMViuC7WtaeL5ya3BpYYSeGj6sHlyVpAq23tJDNp4mI0m2sDX2q5y",
//   "isAdmin": false,
//   "__v": 0,
//   "createdAt": {
//     "$date": {
//       "$numberLong": "1667278630831"
//     }
//   },
//   "updatedAt": {
//     "$date": {
//       "$numberLong": "1667278630831"
//     }
//   }
// }
// //{
//   "_id": {
//     "$oid": "6360a726340ad4c529bdbfbd"
//   },
//   "name": "Jane",
//   "email": "user@example.com",
//   "password": "$2a$10$i4./e.tw5SL4dlrUiPp/Uu8MQu46Q0Z1G5w5A/CSB/bfexkwy9G7u",
//   "isAdmin": false,
//   "__v": 0,
//   "createdAt": {
//     "$date": {
//       "$numberLong": "1667278630832"
//     }
//   },
//   "updatedAt": {
//     "$date": {
//       "$numberLong": "1667278630832"
//     }
//   }
// }
