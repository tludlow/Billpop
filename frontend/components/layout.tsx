import Nav from '@/components/navbar/nav'
import Head from 'next/head'
import Footer from '@/components/footer'

import CookieWarning from '@/components/cookie-warning'

type LayoutProps = {
    title?: string,
    contained?: boolean,
    admin?: boolean,
}
const Layout: React.FC<LayoutProps> = ({ title, contained, admin, children }) => (
    <div className="text-black w-full">
        <Head>
            <title>{title || 'Billpop'}</title>
        </Head>

        <Nav admin={admin} />

        {/* Have the option to remove the container if wanted */}
        <div className={`${contained ? 'container mx-auto px-4 mb-24 md:mb-0 md:px-0' : ''}`}>{children}</div>

        <div className="my-16"></div>
        <CookieWarning />
        <Footer />
    </div>
)

export default Layout
