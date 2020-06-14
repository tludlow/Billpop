import '@/css/tailwind.css'
import Head from 'next/head'

import { Provider } from 'react-redux'
import { useStore } from '../store'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

export default function App({ Component, pageProps }) {
    const store = useStore(pageProps.initialReduxState)
    const persistor = persistStore(store)

    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
                <link
                    href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
                    rel="stylesheet"
                    integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
                    crossOrigin="anonymous"
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
