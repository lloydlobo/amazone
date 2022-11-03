import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'

import React from 'react'

export default function FAQProduct() {
    return (
        <div className="w-full pt-16">
            <div className="w-full max-w-md rounded-2xl bg-white mb-2">
                <Disclosure>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                                <span>What is your refund policy?</span>
                                <ChevronUpIcon
                                    className={`${open ? 'rotate-180 transform' : ''
                                        } h-5 w-5 text-blue-500`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                If you're unhappy with your purchase for any reason, email us
                                within 90 days and we'll refund you in full, no questions asked.
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                <Disclosure as="div" className="mt-2">
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                                <span>Do you offer technical support?</span>
                                <ChevronUpIcon
                                    className={`${open ? 'rotate-180 transform' : ''
                                        } h-5 w-5 text-blue-500`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                No.
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </div>
        </div>
    )
}
