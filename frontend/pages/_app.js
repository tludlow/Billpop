import '@/css/tailwind.css'
import Head from 'next/head'

import { Provider } from 'react-redux'
import { useStore } from '../store'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import CookieWarning from '@/components/cookie-warning'

export default function App({ Component, pageProps }) {
    const store = useStore(pageProps.initialReduxState)
    const persistor = persistStore(store)

    return (
        <>
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;531;600;700;800;900&display=swap"
                    rel="stylesheet"
                />
                <link rel="icon" href="/favicon.ico" />

                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta charSet="utf-8" />
                <meta property="og:title" content="Billpop" />
                <meta property="og:type" content="website" />
                <meta property="og:description" content="An online community driven market place" />
                <meta property="og:image" content="https://via.placeholder.com/450x200.png" />
                <meta property="og:url" content="https://billpop-kohl.now.sh/" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            <Provider store={store}>
                <PersistGate loading={<Component {...pageProps} />} persistor={persistor}>
                    <Component {...pageProps} />
                </PersistGate>
            </Provider>
        </>
    )
}
