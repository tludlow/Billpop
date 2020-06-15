import Layout from '@/components/layout'

export default function ForgotPassword() {
    return (
        <Layout title="Forgot Password - Billpop">
            <div className="max-w-md mx-auto mt-12">
                <h3 className="font-extrabold text-2xl">FORGOT YOUR PASSWORD?</h3>
                <p className="text-gray-400">Enter your email or username to receive a link to change your password.</p>

                <form className="mt-4 flex flex-col" action="">
                    <input
                        className="border border-gray-600 p-2 w-full"
                        placeholder="Username or email address *"
                        type="text"
                        name="identifier"
                        id=""
                        required
                    />
                    <input className="w-full bg-black text-white font-extrabold py-3 mt-5 hover:bg-gray-900" type="submit" value="Send" />
                </form>
            </div>
        </Layout>
    )
}
