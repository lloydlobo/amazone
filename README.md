## Steps Development

<!-- https://www.youtube.com/watch?v=4N77Yj5Wdqk -->
### Create Product Details
- create Product page
- create 3 columns
- show image in first column
- show product info in second column
- show add to cart action on third column
- add styles

<!-- https://www.youtube.com/watch?v=-faQM063ZwA -->
### Handle Changing Cart Items
- add select box for quantity
- handle select box change

<!-- https://youtu.be/gJ5_Rx1S8zY -->
### Save Cart Items
- install `js-cookie` package
- save and retrieve cart items in cookies
- add eslint support for browser, node, es6
- use useEffect for matching state in client & server side. with item count cart

<!-- https://youtu.be/fBew9hQhvLU -->
### Create Login API
- install next-auth
- create nextauth.ts
- implement signin
- use signin in login form

<!-- https://youtu.be/_IBlyR5mRzA?t=9839 -->
### Add User Menu
- Check user authentication
- npm install @headlessui/react <!-- https://headlessui.com/react/menu -->
- show user menu

<!-- https://youtu.be/_IBlyR5mRzA?t=10369 -->
### Create Shipping Screen
- display address fields
- save address in context

<!-- https://youtu.be/_IBlyR5mRzA?t=11392 -->
### Create Payment Screen
- display payment methods
- save payment method in context

### Seed sample products
- create product model in mongoose
- insert sample products to mongodb
- load products from db in home and product screen.
- check product count in stock and in cart.
---

## About Next.js

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
