import Layout from '@/components/layout'
import ExternalProviders from '@/components/external-providers'
import Link from 'next/link'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch } from 'react-redux'
import { login } from '../../actions/userActions'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Login() {
    const dispatch = useDispatch()
    const router = useRouter()
    const [loginError, setLoginError] = useState('')

    return (
        <Layout title="Login - Billpop" contained>
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
                        onSubmit={async (values, { setSubmitting }) => {
                            const res = await dispatch(login(values.email, values.password))
                            if (res.type === 'LOGIN_FAIL') {
                                return setLoginError('Incorrect Email/Password combination')
                            }
                            router.push('/')
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="flex flex-col mt-6 w-full md:w-9/12 ">
                                <label className="mt-4" htmlFor="email">
                                    Email address
                                </label>
                                <ErrorMessage className="text-red-500" name="email" component="div" />
                                <Field
                                    className={`form-input h-12 w-full p-4 rounded border ${
                                        loginError ? 'border-red-500' : 'border-gray-400'
                                    } focus:outline-none placeholder-gray-500 active:bg-white`}
                                    placeholder="johndoe@billpop.com"
                                    type="email"
                                    name="email"
                                    required
                                />

                                <label className="mt-4" htmlFor="password">
                                    Password
                                </label>
                                <Field
                                    className={`form-input h-12 w-full p-4 rounded border ${
                                        loginError ? 'border-red-500' : 'border-gray-400'
                                    } focus:outline-none placeholder-gray-500`}
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

                                {loginError.length > 0 && (
                                    <p className="text-red-500 mt-6 flex items-center">
                                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>{' '}
                                        {loginError}
                                    </p>
                                )}

                                <button
                                    className="mt-5 text-white bg-black w-full py-3 font-bold hover:bg-gray-900"
                                    disabled={isSubmitting}
                                    type="submit"
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

                    <p className="mt-6 text-center w-8/12">Login/Register using one of your other accounts</p>
                    <ExternalProviders />

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
