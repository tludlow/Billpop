import Link from 'next/link'

export default function Nav() {
    return (
        <nav className="h-13 w-full bg-white shadow-xs border border-b border-gray-200">
            <div className="h-full max-w-screen-xl mx-auto flex justify-between">
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
                            <h1 className="font-bold text-xl">Billpop</h1>
                        </div>
                    </Link>
                </div>

                {/* Contents */}
                <div className="h-full flex items-center ">
                    <div className="space-x-3">
                        <Link href="/accounts/login">
                            <button className="bg-gray-700 px-3 py-2 rounded text-white">Log in</button>
                        </Link>
                        <Link href="/accounts/signup">
                            <button className="bg-blue-600 px-3 py-2 rounded text-white">Sign up</button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
