import Layout from '@/components/layout'

import { Formik, Form, Field, ErrorMessage } from 'formik'

export default function Signup() {
    return (
        <Layout title="Signup - Deliberate">
            <div className="card bg-white rounded-lg shadow p-8 w-10/12 lg:w-6/12 mx-auto mt-12 border border-gray-200">
                <h3 className="font-bold text-xl">Sign up</h3>
                <p className="text-gray-600">Create an account so you can have all your information under one roof</p>

                <hr className="my-5" />

                {/* <form action="">
                    <div className="my-3 flex flex-col">
                        <label htmlFor="name">Full name</label>
                        <input
                            type="text"
                            className="rounded border border-gray-400 px-3 py-1 w-8/12 focus:outline-none focus:border-gray-700 placeholder-gray-400"
                            name="name"
                            id="signup-fullname"
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="my-3 flex flex-col">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            className="rounded border border-gray-400 px-3 py-1 w-8/12 focus:outline-none focus:border-gray-700 placeholder-gray-400"
                            name="email"
                            id="signup-email"
                            placeholder="johndoe@deliberate.com"
                        />
                    </div>

                    <div className="my-3 flex flex-col">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="rounded border border-gray-400 px-3 py-1 w-8/12 focus:outline-none focus:border-gray-700 placeholder-gray-400"
                            name="password"
                            id="signup-password"
                            placeholder="••••••••••••••"
                        />
                    </div>

                    <div className="my-3 flex flex-col">
                        <label htmlFor="confirmpassword">Confirm Password</label>
                        <input
                            type="password"
                            className="rounded border border-gray-400 px-3 py-1 w-8/12 focus:outline-none focus:border-gray-700 placeholder-gray-400"
                            name="confirmpassword"
                            id="signup-confirmpassword"
                            placeholder="••••••••••••••"
                        />
                    </div>

                    <button
                        className="mt-6 bg-blue-600 text-white px-3 py-2 rounded shadow hover:bg-blue-700"
                        type="submit"
                    >
                        Create Account
                    </button>
                </form> */}

                <Formik
                    initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
                    validate={(values) => {
                        const errors = {}
                        if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            errors.email = 'Invalid email address'
                        }

                        if (values.password !== values.confirmPassword) {
                            errors.password = 'Your passwords do not match'
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
                        <Form className="flex flex-col">
                            <label className="mt-2" htmlFor="name">
                                Full name
                            </label>
                            <Field
                                className="rounded border border-gray-400 px-3 py-1 w-full lg:w-8/12 focus:outline-none focus:border-gray-700 placeholder-gray-400"
                                placeholder="John Doe"
                                type="text"
                                name="name"
                                required
                            ></Field>

                            <label className="mt-4" htmlFor="email">
                                Email address
                            </label>
                            <Field
                                className="rounded border border-gray-400 px-3 py-1 w-full lg:w-8/12 focus:outline-none focus:border-gray-700 placeholder-gray-400"
                                placeholder="johndoe@deliberate.com"
                                type="email"
                                name="email"
                                required
                            />
                            <ErrorMessage className="text-red-500" name="email" component="div" />

                            <label className="mt-4" htmlFor="password">
                                Password
                            </label>
                            <Field
                                className="rounded border border-gray-400 px-3 py-1 w-full lg:w-8/12 focus:outline-none focus:border-gray-700 placeholder-gray-400 my-2"
                                type="password"
                                name="password"
                                placeholder="••••••••••••••"
                                required
                            />

                            <label className="mt-4" htmlFor="confirmPassword">
                                Confirm password
                            </label>
                            <Field
                                className="rounded border border-gray-400 px-3 py-1 w-full lg:w-8/12 focus:outline-none focus:border-gray-700 placeholder-gray-400 my-2"
                                type="password"
                                name="confirmPassword"
                                placeholder="••••••••••••••"
                                required
                            />
                            <ErrorMessage className="text-red-500" name="password" component="div" />

                            <button
                                className="mt-6 bg-blue-600 text-white px-3 py-2 w-56 rounded shadow hover:bg-blue-700"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Create Account
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </Layout>
    )
}
