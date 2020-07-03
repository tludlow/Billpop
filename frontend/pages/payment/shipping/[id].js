import Layout from '@/components/layout'
import { useRouter } from 'next/router'

export default function ShippingInfo() {
    const router = useRouter()
    const { id } = router.query

    const copyTrackingIDToClipboard = (id) => {
        navigator.clipboard.writeText(id)
    }

    return (
        <Layout title="Shipping Info - Billpop" contained>
            <section className="mt-4 flex justify-between">
                <div className="">
                    <h2 className="font-semibold text-xl">Shipping Information</h2>
                    <p className="mt-2 flex items-center space-x-2">
                        <svg
                            role="button"
                            onClick={() => copyTrackingIDToClipboard(id)}
                            className="w-10 h-10 text-red-500 bg-white p-2 shadow-md rounded-full cursor-pointer border border-red-100 active:bg-gray-100 active:shadow-none"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z"></path>
                            <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z"></path>
                        </svg>

                        <span className="italic">{id}</span>
                    </p>
                </div>
                <div>
                    <button className="px-3 py-2 rounded bg-blue-500 text-white font-medium">Contact Support</button>
                </div>
            </section>

            <section className="mt-8 grid grid-cols-12">
                <div className="col-span-8 "></div>
                <div className="col-span-3 col-start-10 bg-white shadow rounded h-80 border border-gray-200 p-5">
                    <div className="shipping-line flex">
                        <svg
                            className="h-10 w-10 text-white p-2 rounded-full bg-green-400 relative z-10 flex-shrink-0 mr-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"></path>
                            <path
                                fill-rule="evenodd"
                                d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                        <div className="">
                            <h5 className="font-medium">Shipped</h5>
                            <p className="text-gray-600">
                                The seller has packaged your item and is in the process of shipping it
                            </p>
                        </div>
                    </div>
                    <div className="shipping-line flex  opacity-25">
                        <svg
                            className="h-10 w-10 text-white p-2 rounded-full bg-yellow-400 relative z-10 flex-shrink-0 mr-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                        </svg>
                        <div className="">
                            <h5 className="font-medium">Arrived</h5>
                            <p className="text-gray-600">
                                The item has arrived at your nearest postage depot.{' '}
                                <span className="text-blue-600 cursor-pointer">more info</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
