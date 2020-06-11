import Nav from '@/components/nav'
import Head from 'next/head'

export default function Layout(props) {
    return (
        <div className="text-gray-900">
            <Head>
                <title>{props.title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />

                <meta charSet="utf-8" />
                <meta property="og:title" content="Deliberate" />
                <meta property="og:type" content="website" />
                <meta property="og:description" content="Project management techniques made easy" />
                <meta property="og:image" content="https://via.placeholder.com/450x200.png" />
                <meta property="og:url" content="http://billpop.now.sh" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            <Nav />

            <div className="container mx-auto">{props.children}</div>
        </div>
    )
}
