import Layout from '@/components/layout'

function LoadingBar(props) {
    return (
        <div className="flex relative w-full h-3 bg-gray-300 rounded-md">
            <div
                className="loading-fill absolute h-3 rounded-md bg-green-500"
                style={{ width: `${props.loaded}%` }}
            ></div>
        </div>
    )
}
export default function Signup() {
    return (
        <Layout title="Signup - Billpop">
            <div className="max-w-5xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2">
                <div className="hidden md:block">
                    <img src="/signup-pic1.jpg" alt="" />
                </div>
                <div className="mt-8 flex flex-col max-w-sm mx-auto">
                    <LoadingBar loaded={20} />

                    <h3 className="mt-12 font-extrabold text-2xl">SIGN UP</h3>
                    <p className="text-gray-600 text-sm">
                        To create your account, we need to verify your phone number. We will never display this <br />{' '}
                        number publicly
                    </p>

                    <h5 className="mt-8 font-extrabold">Enter phone number</h5>
                    <form className="mt-4" action="">
                        <div className="flex h-12">
                            <select
                                className="w-16 px-1 border border-black rounded-l focus:outline-none"
                                name="country-codes"
                                id="country-codes"
                                aria-label="[object Object]"
                            >
                                <option value="UK">+44 (United Kingdom)</option>
                                <option value="US">+1 (United States)</option>
                                <option value="FR">+33 (France)</option>
                                <option value="GER">+49 (Germany)</option>
                            </select>
                            <input
                                className="border border-gray-400 p-2 rounded-r focus:outline-none w-full"
                                type="tel"
                                placeholder="Phone number"
                                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                name="phone-number"
                                id="phone-number"
                            />
                        </div>

                        <input
                            className="w-full mt-6 bg-black text-white py-2 font-extrabold"
                            type="submit"
                            value="Send code"
                        />
                    </form>
                </div>
            </div>
        </Layout>
    )
}
