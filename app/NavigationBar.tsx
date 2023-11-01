'use client'
import { Skeleton } from '@/app/components'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import { useSession } from "next-auth/react";
import { Avatar, Box, Container, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, Flex, Text } from "@radix-ui/themes"
import classNames from 'classnames';

const NavigationBar = () => {


    return (
        <nav className='border-b mb-5 px-5 h-20 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-2xl'>
            <Container>
                <Flex justify="between">
                    <Flex align="center" gap="3">
                        <Link href="/" className='color'><AiFillBug size={40} /></Link>
                        <NavLinks />
                    </Flex>
                    <AuthStatus />

                </Flex>
            </Container>
        </nav >
    )
}
const NavLinks = () => {
    const currentPath = usePathname();

    const links = [{ label: 'DashBoard', href: '/' }, { label: 'Issues', href: '/issues/list' }]


    return <ul className='flex space-x-6'>
        {links.map(link => <li key={link.href}><Link
            href={link.href}
            className={classNames({
                "nav-link": true,
                "!text-zinc-900": link.href === currentPath,
            })}>{link.label}</Link></li>)
        }

    </ul >
}
const AuthStatus = () => {
    const { status, data: session } = useSession();
    if (status == "loading") return <Skeleton width="3rem" />;
    if (status === "unauthenticated") return <Link href="/api/auth/signin">SignIn</Link>;
    return <Box>

        < DropdownMenu.Root >
            <DropdownMenu.Trigger>
                <Avatar src={session?.user?.image} fallback="?" size="2" radius="full" className="cursor-pointer"></Avatar>
            </DropdownMenu.Trigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    <Text>{session!.user?.email}</Text>

                </DropdownMenuLabel>
                <DropdownMenuItem><Link className='nav-link' href="/api/auth/signout">SignOut</Link></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu.Root>


    </Box>
}
export default NavigationBar