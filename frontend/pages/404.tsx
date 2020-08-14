import Layout from '@/components/layout'

import Link from 'next/link'
import Router from 'next/router'

export default function FourOFour() {
    return (
        <Layout title="Page Not Found - Billpop" contained>
            <div className="mt-12 flex flex-col items-center justify-center">
                <div className="flex items-center justify-center space-x-1">
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

                <h2 className="font-bold text-2xl mt-6">Page not found</h2>
                <p>This page doesnt exist, try going back</p>

                <div className="mt-8 space-x-6">
                    <button
                        className="w-32 px-4 py-2 text-white rounded bg-black font-bold"
                        onClick={() => Router.back()}
                    >
                        Go back
                    </button>
                    <Link href="/">
                        <button className="w-32 px-4 py-2 text-white rounded bg-gray-900 font-bold">Home</button>
                    </Link>
                </div>
            </div>
        </Layout>
    )
}
