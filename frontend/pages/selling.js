import Layout from '@/components/layout'

import Link from 'next/link'
import Router from 'next/router'

export default function Selling() {
    return (
        <Layout title="Selling - Billpop" contained>
            <div
                id="hero"
                className="min-w-max-content bg-cover bg-center overflow-x-hidden"
                style={{
                    backgroundColor: '#7786D7',
                    backgroundImage: `url('http://localhost:3000/selling-img2.jpg')`,
                    height: '477px',
                }}
            ></div>
        </Layout>
    )
}
