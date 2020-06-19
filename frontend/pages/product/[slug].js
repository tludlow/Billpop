import Layout from '@/components/layout'

export default function ProductPage() {
    return (
        <Layout title="PRODUCT SLUG HERE - Billpop" contained>
            <div className="mt-8 grid grid-cols-2">
                <div className="bg-red-500 w-full">
                    <div className="bg-red-500 h-96 w-full"></div>
                    <div className="bg-red-500 h-96 w-full"></div>
                    <div className="bg-red-500 h-96 w-full"></div>
                    <div className="bg-red-500 h-96 w-full"></div>

                    <div className="bg-red-500 h-96 w-full"></div>
                    <div className="bg-red-500 h-96 w-full"></div>
                    <div className="bg-red-500 h-96 w-full"></div>
                    <div className="bg-red-500 h-96 w-full"></div>
                    <div className="bg-red-500 h-96 w-full"></div>
                    <div className="bg-red-500 h-96 w-full"></div>
                    <div className="bg-red-500 h-96 w-full"></div>
                </div>

                <div className="px-6 w-8/12">
                    <div className="sticky top-20">
                        <div>
                            <img className="w-15 h-15 rounded-full" src="/profile_img.png" alt="Billy's Product" />
                            <h5 className="mt-1 font-bold">Billy</h5>
                            <p>Blackpool, Yorkshire, United Kingdom</p>
                        </div>

                        <div className="mt-8">
                            <p>
                                Some long description here about the product, to be honest i dont know what people would
                                put here... maybe something about the colour? how it fits in real life, the sizing?
                                something like that which is deemed of importance to the sale
                            </p>
                        </div>

                        <div className="mt-6 flex justify-between pb-1 border-b border-gray-300">
                            <p>Price</p>
                            <p>£10.00</p>
                        </div>

                        <select className="mt-2 form-select w-full" name="sizing" id="sizing-select">
                            <option value="Choose size" selected="selected" disabled>
                                Choose size
                            </option>
                            <option value="6">6</option>
                            <option value="8">8</option>
                        </select>
                        <small className="text-gray-400">Listed 3 months ago</small>

                        <div className="mt-5 w-full p-3 flex border border-black">
                            <div className="flex-shrink-0 flex items-center ml-1 mr-5">
                                <svg className="w-8 h-8" viewBox="0 0 28 34">
                                    <title>Buyer Protection Badge</title>
                                    <path
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M25.47 10.21c-.014-.756-.027-1.47-.027-2.162a.97.97 0 00-.958-.98c-4.098 0-7.217-1.204-9.818-3.79a.943.943 0 00-1.335 0c-2.6 2.586-5.72 3.79-9.817 3.79a.97.97 0 00-.958.98c0 .691-.013 1.406-.027 2.162-.132 7.035-.312 16.67 11.156 20.736a.938.938 0 00.627 0C25.781 26.88 25.602 17.245 25.47 10.209zM9.482 17.332l3.325 3.334m0 0L19.457 14"
                                    ></path>
                                </svg>
                            </div>
                            <div className="">
                                <p>All purchases through Billpop are covered by Buyer Protection.</p>
                                <p className="text-red-500 cursor-pointer">Learn More</p>
                            </div>
                        </div>

                        <button className="mt-6 py-2 w-full bg-black text-white font-bold text-lg">Buy now</button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
