import Layout from '@/components/layout'

import Link from 'next/link'
import Router from 'next/router'

export default function FourOFour() {
    return (
        <Layout title="Page Not Found - Deliberate">
            <section className="mt-12 flex flex-col items-center text-center">
                <h2 className="text-2xl font-bold">Page not found</h2>
                <p className="text-gray-600">
                    This page doesn't exist, use one of the options below to find your way back to safety
                </p>

                <div className="mt-6 flex space-x-6">
                    <Link href="/">
                        <div className="btn">Home</div>
                    </Link>
                    <div className="btn bg-gray-800" onClick={() => Router.back()}>
                        Go back
                    </div>
                </div>
            </section>
        </Layout>
    )
}
