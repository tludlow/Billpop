import Layout from '@/components/layout'

import Link from 'next/link'
import Router from 'next/router'

export default function FourOFour() {
    return (
        <Layout title="Page Not Found - Billpop">
            <div className="mt-12 flex flex-col items-center justify-center">
                <h2 className="font-bold text-2xl">Page not found</h2>
                <p>This page doesnt exist, try going back</p>
            </div>
        </Layout>
    )
}
