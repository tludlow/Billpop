import Layout from '@/components/layout'

export default function Payment() {
    return (
        <Layout title="Pay - Billpop">
            <div className="max-w-4xl h-16 mx-auto">
                <div className="px-3 mt-8 flex items-center">
                    <svg className="w-6 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fill-rule="evenodd"
                            d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                    <p>Cancel</p>
                </div>

                <div className="px-3 mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="">
                        <h3 className="font-bold text-2xl">Review your order</h3>
                        <p className="mt-2">
                            Once you've paid, you'll be able to see your receipt in-app, we'll also send you an e-mail
                            to confirm your order. If you want help, get in touch with the seller or take a look at our
                            help center.
                        </p>

                        <div className="mt-5 flex justify-between items-center">
                            <h5 className="font-bold text-lg">EMAIL</h5>
                            <p className="text-red-500 text-sm cursor-pointer">Not you? Logout</p>
                        </div>
                        <p className="text-sm">testemail123@billpop.com</p>

                        <div className="mt-6">
                            <h5 className="font-bold text-lg">DELIVERY ADDREESS</h5>
                            <form action="">
                                <fieldset className="mt-3 space-y-2">
                                    <div className="">
                                        <input
                                            className="form-input w-full"
                                            type="text"
                                            id="name"
                                            placeholder="First and last name"
                                        />
                                    </div>

                                    <div className="">
                                        <input
                                            className="form-input w-full"
                                            type="text"
                                            id="address"
                                            placeholder="Address"
                                        />
                                    </div>

                                    <div className="">
                                        <input className="form-input w-full" type="text" id="city" placeholder="City" />
                                    </div>

                                    <div className="">
                                        <input
                                            className="form-input w-full"
                                            type="text"
                                            id="state-county"
                                            placeholder="State or County"
                                        />
                                    </div>

                                    <div className="">
                                        <input
                                            className="form-input w-full"
                                            type="text"
                                            id="postcode"
                                            placeholder="Postcode or zip"
                                        />
                                    </div>

                                    <div className="">
                                        <select className="form-select w-full" name="country" id="country">
                                            <option value="United Kingdom">United Kingdom</option>
                                            <option value="United Kingdom">United States</option>
                                            <option value="United Kingdom">United Portugal</option>
                                        </select>
                                    </div>

                                    <div className="">
                                        <input
                                            className="form-input w-full"
                                            type="email"
                                            id="email"
                                            placeholder="Email"
                                        />
                                    </div>

                                    <div className="">
                                        <input
                                            className="form-input w-full"
                                            type="tel"
                                            id="phonenumber"
                                            placeholder="Phone number"
                                        />
                                    </div>

                                    <input type="submit" className="w-full py-1 bg-black text-white" value="Add" />
                                </fieldset>
                            </form>
                        </div>
                    </div>
                    <div className="md:w-10/12">
                        <div className="w-full border border-gray-200 p-3">
                            <h5 className="font-bold text-lg">ITEM DETAILS</h5>
                            <div className="mt-1 grid grid-cols-4 gap-1 row-gap-2">
                                <img
                                    className="h-20 w-20"
                                    src="https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                                    alt=""
                                />
                                <img
                                    className="h-20 w-20"
                                    src="https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                                    alt=""
                                />
                                <img
                                    className="h-20 w-20"
                                    src="https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                                    alt=""
                                />
                                <img
                                    className="h-20 w-20"
                                    src="https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                                    alt=""
                                />
                                <img
                                    className="h-20 w-20"
                                    src="https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                                    alt=""
                                />
                            </div>

                            <div className="mt-3 flex justify-between items-center pb-1 border-b border-gray-400">
                                <p>Size</p>
                                <p>UK 6</p>
                            </div>

                            <h5 className="mt-4 font-bold text-lg">TOTAL</h5>
                            <div className="mt-3 flex justify-between items-center pb-1 border-b border-gray-400">
                                <p>Item price</p>
                                <p>£10.00</p>
                            </div>

                            <div className="mt-4 flex justify-between items-center">
                                <p>Total</p>
                                <p>£10.00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
