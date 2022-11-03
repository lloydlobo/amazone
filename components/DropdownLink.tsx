import Link from 'next/link'
import React from 'react'

type Props = {
    [x: string]: any
    href: any
    children: any
}

/** 
* DropdownLink React functional component.
*
* Uses headlessui package.
*/
export default function DropdownLink(props: Props): JSX.Element {
    // rest is rest of properties of DropdownLink.
    // since declaring on the tag doesn't work.
    let { href, children, ...rest } = props

    return (
        <Link href={href}>
            <a {...rest}>
                {children}
            </a>
        </Link>
    )
}
