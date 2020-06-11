import Link from 'next/link'

export default function Footer() {
    return (
        <div className="w-full h-12 fixed z-10 bottom-0 bg-white border-t border-gray-300 overflow-x-hidden">
            <div className="max-w-6xl h-full mx-auto flex items-center justify-between">
                <div className="">
                    <li className="flex items-center space-x-3 text-sm">
                        <Link href="/blog">
                            <ul className="cursor-pointer hover:font-semibold">Blog</ul>
                        </Link>
                        <Link href="/about">
                            <ul className="cursor-pointer hover:font-semibold">About</ul>
                        </Link>
                        <Link href="/selling">
                            <ul className="cursor-pointer hover:font-semibold">Sell on Depop</ul>
                        </Link>
                        <Link href="/jobs">
                            <ul className="cursor-pointer hover:font-semibold">Jobs</ul>
                        </Link>
                        <Link href="/events">
                            <ul className="cursor-pointer hover:font-semibold">Events</ul>
                        </Link>
                        <Link href="/spaces">
                            <ul className="cursor-pointer hover:font-semibold">Spaces</ul>
                        </Link>
                        <Link href="/press">
                            <ul className="cursor-pointer hover:font-semibold">Press</ul>
                        </Link>
                        <Link href="/support">
                            <ul className="cursor-pointer hover:font-semibold">Support</ul>
                        </Link>
                        <Link href="/terms">
                            <ul className="cursor-pointer hover:font-semibold">Terms</ul>
                        </Link>
                        <Link href="/privacy">
                            <ul className="cursor-pointer hover:font-semibold">Privacy</ul>
                        </Link>
                        <Link href="/safety">
                            <ul className="cursor-pointer hover:font-semibold">Safety</ul>
                        </Link>
                    </li>
                </div>
                <div className="flex space-x-4 items-center">
                    <svg className="h-4 w-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                    </svg>
                    <svg className="h-4 w-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                    <svg className="h-4 w-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path>
                        <path
                            fillRule="evenodd"
                            d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                    <form action="">
                        <select className="rounded border border-gray-300 px-2" id="languages" name="languages">
                            <option value="english">English</option>
                            <option value="french">French</option>
                            <option value="spanish">Spanish</option>
                            <option value="billish">Billish</option>
                        </select>
                    </form>
                </div>
            </div>
        </div>
    )
}
