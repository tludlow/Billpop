import Layout from '@/components/layout'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useState } from 'react'

export default function ResetPassword() {
    const [hasRequested, setHasRequested] = useState(false)
    return (
        <Layout title="Reset Password - Billpop" contained>
            <div className="mt-10 md:max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col items-center p-4">
                    <h3 className="font-bold text-xl">Reset Password</h3>
                    <p className="text-center text-gray-600">
                        Forgot your password and wan't to change it? Enter your email below to receive instructions on
                        how to proceed
                    </p>

                    <p className="mt-4 text-gray-600">
                        Your email is: <span className="font-medium">t*************s@g*****.com</span>
                    </p>

                    <Formik
                        initialValues={{ email: '' }}
                        validate={(values) => {
                            const errors = {}
                            return errors
                        }}
                        onSubmit={async (values, { setSubmitting }) => {
                            setSubmitting(true)
                            //Validate that this is the email for the account, if so set the state to true so the message shows up to inform the user
                            setTimeout(() => {
                                setSubmitting(false)
                            }, 1000)
                            setHasRequested(true)
                        }}
                    >
                        {({ isSubmitting, values }) => (
                            <Form className="flex flex-col mt-6 w-full md:w-9/12 ">
                                <label className="mt-4" htmlFor="email">
                                    Email address
                                </label>
                                <ErrorMessage className="text-red-500" name="email" component="div" />
                                <Field className="form-input" placeholder="" type="email" name="email" required />

                                {hasRequested && (
                                    <p className="text-center text-green-600 mt-4">
                                        A password reset email has been sent to: {values.email}
                                    </p>
                                )}
                                <button
                                    className="mt-5 text-white bg-black w-full py-3 font-bold hover:bg-gray-900 disabled:text-gray-800"
                                    disabled={isSubmitting}
                                    type="submit"
                                >
                                    Reset Password
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className="hidden md:block">
                    <img
                        className="w-full h-full"
                        src="https://images.unsplash.com/photo-1597966264478-056a996cf333?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
                        alt=""
                    />
                </div>
            </div>
        </Layout>
    )
}
