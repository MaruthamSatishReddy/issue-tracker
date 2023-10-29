'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classNames from 'classnames'

const NavigationBar = () => {
    const currentPath = usePathname();
    console.log(currentPath);
    const links = [{ label: 'DashBoard', href: '/' }, { label: 'Issues', href: '/issues/list' }]

    return (
        <nav className='flex space-x-6 border-b mb-5 px-5 h-20 items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-2xl'><Link href="/" className='color'><AiFillBug size={40} /></Link>
            <ul className='flex space-x-6'>
                {links.map(link => <Link key={link.href}
                    href={link.href}
                    className={classNames({
                        'text-white': link.href === currentPath,
                        'text-gray-400': link.href !== currentPath,
                        'hover:text-gray-800 transition-colors': true,
                        'font-semibold': true
                    })}>{link.label}</Link>)}

            </ul>
        </nav>
    )
}

export default NavigationBar