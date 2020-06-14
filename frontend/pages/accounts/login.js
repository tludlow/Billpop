import Layout from '@/components/layout'
import Link from 'next/link'

import { Formik, Form, Field, ErrorMessage } from 'formik'

export default function Login() {
    return (
        <Layout title="Login - Billpop">
            <div className="mt-10 md:max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col items-center p-4">
                    <h3 className="font-bold text-xl">Log in</h3>

                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validate={(values) => {
                            const errors = {}
                            if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                errors.email = 'Invalid email address'
                            }
                            return errors
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setSubmitting(false)
                            setTimeout(() => {
                                alert(JSON.stringify(values, null, 2))
                                setSubmitting(false)
                            }, 400)
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="flex flex-col mt-6 w-full md:w-9/12 ">
                                <label className="mt-4" htmlFor="email">
                                    Email address
                                </label>
                                <ErrorMessage className="text-red-500" name="email" component="div" />
                                <Field
                                    className="h-12 w-full p-4 rounded border border-gray-400 focus:outline-none placeholder-gray-500"
                                    placeholder="johndoe@billpop.com"
                                    type="email"
                                    name="email"
                                    required
                                />

                                <label className="mt-4" htmlFor="password">
                                    Password
                                </label>
                                <Field
                                    className="h-12 w-full p-4 rounded border border-gray-400 focus:outline-none placeholder-gray-500"
                                    type="password"
                                    name="password"
                                    placeholder="••••••••••••••"
                                    required
                                />
                                <Link href="/accounts/forgot-password">
                                    <p className="mt-1 text-gray-600 text-right cursor-pointer hover:underline">
                                        Forgot password?
                                    </p>
                                </Link>

                                <button
                                    className="mt-6 text-white bg-black w-full py-3 font-bold hover:bg-gray-900"
                                    disabled={isSubmitting}
                                >
                                    Log in
                                </button>
                            </Form>
                        )}
                    </Formik>
                    {/* <form className="mt-6 w-9/12 space-y-6" action="">
                        <div className="">
                            <label htmlFor="email">Email</label>
                            <input
                                className="h-12 w-full p-4 rounded border border-gray-400 focus:outline-none placeholder-gray-500"
                                placeholder="johndoe@billpop.com"
                                name="email"
                                type="email"
                                required
                            />
                        </div>

                        <div className="">
                            <label htmlFor="password">Password</label>
                            <input
                                className="h-12 w-full p-4 rounded border border-gray-400 focus:outline-none placeholder-gray-500"
                                type="password"
                                name="password"
                                id=""
                                placeholder="••••••••••••"
                            />
                            <Link href="/accounts/forgot-password">
                                <p className="mt-1 text-gray-600 text-right cursor-pointer hover:underline">
                                    Forgot password?
                                </p>
                            </Link>
                        </div>

                        <button className="text-white bg-black w-full py-3 font-bold">Log in</button>
                    </form> */}

                    <p className="mt-6 text-center w-8/12">Log in using one of your other accounts</p>
                    <div className="mt-3 w-full md:w-9/12 mt-6 flex justify-between">
                        <div className="w-2/12 py-2 flex items-center justify-center rounded border border-gray-200 cursor-pointer">
                            <svg className="h-8 w-8" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                    fill="#4285f4"
                                />
                                <path
                                    d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                    fill="#34a853"
                                />
                                <path
                                    d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                    fill="#fbbc04"
                                />
                                <path
                                    d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                    fill="#ea4335"
                                />
                            </svg>
                        </div>

                        <div className="w-2/12 py-2 flex items-center justify-center rounded border border-gray-200 cursor-pointer">
                            <svg
                                className="h-8 w-8 text-blue-500"
                                aria-hidden="true"
                                data-prefix="fab"
                                data-icon="twitter-square"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-48.9 158.8c.2 2.8.2 5.7.2 8.5 0 86.7-66 186.6-186.6 186.6-37.2 0-71.7-10.8-100.7-29.4 5.3.6 10.4.8 15.8.8 30.7 0 58.9-10.4 81.4-28-28.8-.6-53-19.5-61.3-45.5 10.1 1.5 19.2 1.5 29.6-1.2-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3a65.447 65.447 0 01-29.2-54.6c0-12.2 3.2-23.4 8.9-33.1 32.3 39.8 80.8 65.8 135.2 68.6-9.3-44.5 24-80.6 64-80.6 18.9 0 35.9 7.9 47.9 20.7 14.8-2.8 29-8.3 41.6-15.8-4.9 15.2-15.2 28-28.8 36.1 13.2-1.4 26-5.1 37.8-10.2-8.9 13.1-20.1 24.7-32.9 34z"
                                />
                            </svg>
                        </div>

                        <div className="w-2/12 py-2 flex items-center justify-center rounded border border-gray-200 cursor-pointer">
                            <svg
                                className="h-8 w-8 text-blue-600"
                                aria-hidden="true"
                                data-prefix="fab"
                                data-icon="facebook-square"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M400 32H48A48 48 0 000 80v352a48 48 0 0048 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0048-48V80a48 48 0 00-48-48z"
                                />
                            </svg>
                        </div>

                        <div className="w-2/12 py-2 flex items-center justify-center rounded border border-gray-200 cursor-pointer">
                            <svg
                                className="h-8 w-8 text-gray-900"
                                aria-hidden="true"
                                data-prefix="fab"
                                data-icon="apple"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                                />
                            </svg>
                        </div>
                    </div>

                    <div className="relative mt-8 w-full md:w-9/12">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-600"></div>
                        </div>
                        <div className="relative flex jusitfy-center w-12 mx-auto">
                            <span className="px-4 text-sm leading-5 bg-white text-gray-900">or</span>
                        </div>
                    </div>

                    <div className="mt-12 w-full md:w-9/12">
                        <p className="text-center">Dont have an account?</p>
                        <Link href="/accounts/signup">
                            <button className="mt-4 border border-gray-500 rounded w-full py-3">Sign up</button>
                        </Link>
                    </div>
                </div>
                <div className="hidden md:block">
                    <img
                        className="w-full h-full"
                        src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
                        alt=""
                    />
                </div>
            </div>
        </Layout>
    )
}
