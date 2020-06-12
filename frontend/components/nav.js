import Link from 'next/link'
import { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { changeUser, logoutUser } from '../actions/userActions'

export default function Nav() {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const [dropdownActive, setDropdownActive] = useState(false)

    return (
        <>
            <nav className="sticky top-0 z-10 h-13 w-full bg-white shadow-xs border border-b border-gray-200">
                <div className="h-full px-4 lg:px-0 max-w-screen-xl mx-auto flex justify-between">
                    {/* Logo */}
                    <div className="">
                        <Link href="/">
                            <div className="h-full flex items-center space-x-2 cursor-pointer">
                                <svg
                                    className="h-8 w-8 text-red-600"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                                </svg>
                                <h1 className="font-bold text-xl text-red-600">Billpop</h1>
                            </div>
                        </Link>
                    </div>

                    {/* Contents */}
                    <div className="h-full flex items-center ">
                        {user.loggedIn ? (
                            <div
                                className="relative flex items-center cursor-pointer"
                                onClick={() => setDropdownActive(!dropdownActive)}
                            >
                                <p className="mr-1">{user.username}</p>
                                <svg className="h-4 w-5 text-gray-700 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>

                                <img
                                    className="h-9 w-9 rounded-full border border-gray-400 shadow select-none"
                                    src="/profile_img.png"
                                    alt={`${user.username}'s Profile Photo`}
                                />

                                {/* Dropdown */}
                                <div
                                    className={`${
                                        dropdownActive
                                            ? 'block transition ease-out duration-100 transform opacity-100 scale-100'
                                            : 'hidden transition ease-in duration-75 transform opacity-0 scale-95'
                                    } origin-top-right absolute top-9 right-0 mt-2 w-56 rounded-md shadow-lg`}
                                >
                                    <div className="rounded-md bg-white shadow-xs">
                                        <div
                                            className="py-1"
                                            role="menu"
                                            aria-orientation="vertical"
                                            aria-labelledby="options-menu"
                                        >
                                            <a
                                                href="#"
                                                className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                                role="menuitem"
                                            >
                                                Profile
                                            </a>
                                            <a
                                                href="#"
                                                className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                                role="menuitem"
                                            >
                                                Account Settings
                                            </a>
                                            <button
                                                className="block w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                                role="menuitem"
                                                onClick={() => dispatch(logoutUser())}
                                            >
                                                Sign out
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link href="/accounts/login">
                                <button onClick={() => dispatch(changeUser())} className="text-lg font-semibold">
                                    Login
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </>
    )
}
