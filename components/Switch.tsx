import { useState } from 'react'
import { Switch } from '@headlessui/react'

/**
* MyToggle.
*
*/
// https://headlessui.com/react/switch
export default function Example() {
    const [enabled, setEnabled] = useState(false)

    return (
        <div className="">
            <Switch
                checked={enabled}
                onChange={setEnabled}
                className={` ${enabled
                    ? 'bg-teal-900'
                    : 'bg-teal-700'
                    } relative inline-flex h-[20px] w-[36px] shrink-0 cursor-pointer 
                      rounded-full border-2 border-transparent 
                      transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  
                      focus-visible:ring-white focus-visible:ring-opacity-75 
                `}
            >
                <span className="sr-only">Use setting</span>
                <span
                    aria-hidden="true"
                    className={`${enabled ? 'translate-x-5' : 'translate-x-0'}
            pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
            </Switch>
        </div>
    )
}
// export default function MyToggle() {
//     const [enabled, setEnabled] = useState(false)

//     return (
//         <Switch
//             checked={enabled}
//             onChange={setEnabled}
//             className={`${enabled ? 'bg-blue-600' : 'bg-gray-200'
//                 } relative inline-flex h-6 w-11 items-center rounded-full`}
//         >
//             <span className="sr-only">Enable notifications</span>
//             <span
//                 className={`${enabled ? 'translate-x-6' : 'translate-x-1'
//                     } inline-block h-4 w-4 transform rounded-full bg-white transition`}
//             />
//         </Switch>
//     )
// }

