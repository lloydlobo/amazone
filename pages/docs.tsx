import Link from 'next/link'
import { Tab } from '@headlessui/react'
import React from 'react'
import Layout from '../components/Layout'
import { SubmitHandler, useForm } from "react-hook-form";

import { useState } from 'react'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    let [categories] = useState({
        Recent: [
            {
                id: 1,
                title: 'Does drinking coffee make you smarter?',
                date: '5h ago',
                commentCount: 5,
                shareCount: 2,
            },
            {
                id: 2,
                title: "So you've bought coffee... now what?",
                date: '2h ago',
                commentCount: 3,
                shareCount: 2,
            },
        ],
        Popular: [
            {
                id: 1,
                title: 'Is tech making coffee better or worse?',
                date: 'Jan 7',
                commentCount: 29,
                shareCount: 16,
            },
            {
                id: 2,
                title: 'The most innovative things happening in coffee',
                date: 'Mar 19',
                commentCount: 24,
                shareCount: 12,
            },
        ],
        Trending: [
            {
                id: 1,
                title: 'Ask Me Anything: 10 answers to your questions about coffee',
                date: '2d ago',
                commentCount: 9,
                shareCount: 5,
            },
            {
                id: 2,
                title: "The worst advice we've ever heard about coffee",
                date: '4d ago',
                commentCount: 1,
                shareCount: 2,
            },
        ],
    })

    // https://headlessui.com/react/tabs
    return (
        <Layout title={'Docs'} >
            <div className="w-full max-w-md px-2 py-16 sm:px-0">
                <Tab.Group>
                    <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                        {Object.keys(categories).map((category) => (
                            <Tab
                                key={category}
                                className={({ selected }) =>
                                    classNames(
                                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                        selected
                                            ? 'bg-white shadow'
                                            : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                    )
                                }
                            >
                                {category}
                            </Tab>
                        ))}
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                        {Object.values(categories).map((posts, idx) => (
                            <Tab.Panel
                                key={idx}
                                className={classNames(
                                    'rounded-xl bg-white p-3',
                                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                                )}
                            >
                                <ul>
                                    {posts.map((post) => (
                                        <li
                                            key={post.id}
                                            className="relative rounded-md p-3 hover:bg-gray-100"
                                        >
                                            <h3 className="text-sm font-medium leading-5">
                                                {post.title}
                                            </h3>

                                            <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                                                <li>{post.date}</li>
                                                <li>&middot;</li>
                                                <li>{post.commentCount} comments</li>
                                                <li>&middot;</li>
                                                <li>{post.shareCount} shares</li>
                                            </ul>

                                            <a
                                                href="#"
                                                className={classNames(
                                                    'absolute inset-0 rounded-md',
                                                    'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2'
                                                )}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </Tab.Panel>
                        ))}
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </Layout>
    )
}
type Inputs = {
    email: string,
    passwordRequired: string,
};
// username & password. mongodb
// next-tailwind-amazone
/**
* [Part 8 Create Login Form] https://youtu.be/pz6mhAHPjVs
* https://react-hook-form.com/
*/
// export default function DocsScreen() {
//     const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

//     const onSubmit: SubmitHandler<Inputs> = ({ email, passwordRequired }): void => {
//         console.log(email, passwordRequired)
//     }

//     console.log(watch("email"))

//     return (
//         <Layout title={"Login"}>
//             <h1 className='mb-2 text-xl'>
//                 Docs
//             </h1>

//             <div className='hover:shadow-md px-8 py-4'>
//                 <h2 className='mb-1'>
//                     Endpoints
//                 </h2>

//                 <ul className='list-disc list-inside'>
//                     <li>
//                         <a href='/api/seed'>/api/seed</a>
//                     </li>
//                     {/* <li></li> */}
//                     {/* <li></li> */}
//                 </ul>

//                 <Tab.Group>
//                     <Tab.List>
//                         <Tab>Tab 1</Tab>
//                         <Tab>Tab 2</Tab>
//                         <Tab>Tab 3</Tab>
//                     </Tab.List>
//                     <Tab.Panels>
//                         <Tab.Panel>Content 1</Tab.Panel>
//                         <Tab.Panel>Content 2</Tab.Panel>
//                         <Tab.Panel>Content 3</Tab.Panel>
//                     </Tab.Panels>
//                 </Tab.Group>

//             </div>

//             {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
//             <form
//                 onSubmit={handleSubmit(onSubmit)}
//                 className='mx-auto max-w-screen-md'
//             >
//                 <h1 className='mb-4 text-xl hidden'>
//                     Docs
//                 </h1>
//                 <div className='border p-8 hidden'>
//                     <div className='mb-4'>
//                         {/* Connect id of label with corresponding input. */}
//                         <label htmlFor='email'>Email</label>
//                         {/* register your input into the hook by invoking the "register" function */}
//                         <input type={"email"} id='email'
//                             className='w-full' autoFocus
//                             {...register("email", {
//                                 required: 'Please enter email.',
//                                 pattern: {
//                                     value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
//                                     message: 'Please enter a valid email.'
//                                 },
//                             })}
//                         />
//                         {/* errors will return when field validation fails  */}
//                         {errors.email &&
//                             (<div className='text-red-500'>{errors.email?.message}</div>)
//                         }
//                     </div>
//                     <div className='mb-4'>
//                         {/* Connect id of Password with corresponding password input box. */}
//                         <label htmlFor='password'>Password</label>
//                         {/* include validation with required or other standard HTML validation rules */}
//                         <input type={"password"} id='password'
//                             className='w-full' autoFocus
//                             {...register("passwordRequired", {
//                                 required: 'Please enter a password.',
//                                 minLength: {
//                                     value: 6,
//                                     message: 'password is more than 5 chars.'
//                                 }
//                             })}
//                         />
//                         {/* errors will return when field validation fails  */}
//                         {errors.passwordRequired &&
//                             (<div className='text-red-500'>{errors.passwordRequired?.message}</div>)
//                         }
//                     </div>
//                     <div className='mb-4'>
//                         <button className='primary-button'>Login</button>
//                     </div>
//                     <div className='mb-4 text-sm'>
//                         Don&apos;t have an account? &nbsp;
//                         <Link href={"/register"}>Register</Link>
//                     </div>
//                 </div>

//             </form>

//         </Layout>
//     )
// }
