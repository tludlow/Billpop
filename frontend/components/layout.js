import Nav from '@/components/navbar/nav'
import Head from 'next/head'
import Footer from '@/components/footer'

import CookieWarning from '@/components/cookie-warning'

export default function Layout(props) {
    return (
        <div className="text-black w-full">
            <Head>
                <title>{props.title || 'Billpop'}</title>
            </Head>

            <Nav admin={props.admin} />

            {/* Have the option to remove the container if wanted */}
            <div className={`${props.contained ? 'container mx-auto px-4 mb-24 md:mb-0 md:px-0' : ''}`}>
                {props.children}
            </div>

            <div className="my-16"></div>
            <CookieWarning />
            <Footer />
        </div>
    )
}
