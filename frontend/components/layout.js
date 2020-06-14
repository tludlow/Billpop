import Nav from '@/components/nav'
import Head from 'next/head'
import Footer from '@/components/footer'

export default function Layout(props) {
    return (
        <div className="text-black h-screen w-screen">
            <Head>
                <title>{props.title || 'Billpop'}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />

                <meta charSet="utf-8" />
                <meta property="og:title" content="Billpop" />
                <meta property="og:type" content="website" />
                <meta property="og:description" content="An online community driven market place" />
                <meta property="og:image" content="https://via.placeholder.com/450x200.png" />
                <meta property="og:url" content="https://billpop-kohl.now.sh/" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            <Nav />

            {/* Have the option to remove the container if wanted */}
            <div className={`${props.container === false ? '' : 'container mx-auto px-4 md:px-0'}`}>
                {props.children}
            </div>

            <Footer />
        </div>
    )
}
