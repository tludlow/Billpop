import Nav from '@/components/nav'
import Head from 'next/head'
import Footer from '@/components/footer'

import CookieWarning from '@/components/cookie-warning'

export default function Layout(props) {
    return (
        <div className="text-black h-screen w-screen">
            <Head>
                <title>{props.title || 'Billpop'}</title>
            </Head>

            <Nav />

            {/* Have the option to remove the container if wanted */}
            <div className={`${props.contained ? 'container mx-auto px-4 md:px-0' : ''}`}>{props.children}</div>

            <CookieWarning />
            <Footer />
        </div>
    )
}
