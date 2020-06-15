import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { changeUser, logout } from '../actions/userActions'

export default function Nav() {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const dropdownRef = useRef()
    const [dropdownActive, setDropdownActive] = useState(false)

    const [mobileFlyoutActive, setMobileFlyoutActive] = useState(false)

    const handleClickOutside = (e) => {
        if (dropdownRef.current.contains(e.target)) {
            //clicking the dropdown
            return
        }
        //not clicking the dropdown, close it
        setDropdownActive(false)
    }

    useEffect(() => {
        if (dropdownActive) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [dropdownActive])
    return (
        <>
            <nav className="sticky top-0 z-10 h-16 md:h-13 w-full bg-white shadow-xs border border-b border-gray-200">
                <div className="h-full px-4 lg:px-0 max-w-screen-xl mx-auto flex justify-between">
                    {/* Mobile flyout menu button (shown on mobile, hidden on medium and up) */}
                    <div className="flex md:hidden items-center">
                        <button
                            id="nav-flyout-toggle"
                            className="font-extrabold"
                            onClick={() => setMobileFlyoutActive(true)}
                        >
                            <svg className="h-6 w-6 tex-gray-900" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>

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
                                ref={dropdownRef}
                                id="dropdown-menu"
                                className="relative flex items-center cursor-pointer"
                                aria-haspopup="true"
                                aria-expanded="true"
                                onClick={() => setDropdownActive(!dropdownActive)}
                            >
                                <img
                                    className="h-10 w-10 mr-3 rounded-full border border-gray-400 shadow select-none"
                                    src="/profile_img.png"
                                    alt={`${user.username}'s Profile Photo`}
                                />
                                <p className="mr-1">{user.username}</p>
                                <svg className="h-4 w-5 text-gray-700 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>

                                {/* Dropdown */}
                                <div
                                    tabIndex="0"
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
                                            aria-labelledby="dropdown-menu"
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
                                                onClick={() => dispatch(logout())}
                                            >
                                                Sign out
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link href="/accounts/login">
                                <button className="text-lg font-semibold">Login</button>
                            </Link>
                        )}
                    </div>

                    {/* Mobile flyout (only shown on mobile, hidden on medium and up)*/}
                    <div
                        className={`${
                            mobileFlyoutActive ? 'flyout-menu-open' : 'flyout-menu-closed'
                        } fixed flyout-menu md:hidden top-0 bottom w-5/12 h-screen z-25 shadow-md bg-white pl-6 pr-3 pt-5`}
                    >
                        <div className="flex items-center justify-between">
                            <button id="flyout-toggle-close" onClick={() => setMobileFlyoutActive(false)}>
                                <svg className="h-6 w-6 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                            <div className="space-x-2">
                                <svg
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                    data-prefix="fab"
                                    data-icon="instagram"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                                    />
                                </svg>
                            </div>
                        </div>

                        <ul className="mt-6 text-md space-y-3">
                            <li>Blog</li>
                            <li>About</li>
                            <li>Sell on Depop</li>
                            <li>Jobs</li>
                            <li>Events</li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
