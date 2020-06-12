import Link from 'next/link'

export default function Nav() {
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
                        <Link href="/accounts/login">
                            <button className="text-lg font-semibold">Login</button>
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    )
}
