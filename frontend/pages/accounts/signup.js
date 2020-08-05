import Layout from '@/components/layout'
import ExternalProviders from '@/components/external-providers'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { emailUsernameExist, createRegistrationSms, verifyRegistrationSms, register } from '../../actions/userActions'
import api from '../../lib/api'

function LoadingBar(props) {
    return (
        <>
            {props.stage > 0 && (
                <div id="loading-back" className="mr-4 flex items-center cursor-pointer" onClick={props.handleClick}>
                    <svg className="h-3 w-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                    <p>Back</p>
                </div>
            )}

            <div className="flex relative w-full h-3 mt-2 bg-gray-300 rounded-md">
                <div
                    className="loading-fill absolute h-3 rounded-md bg-green-500"
                    style={{ width: `${props.loaded}%` }}
                ></div>
            </div>
        </>
    )
}

//All of the steps on this page have a similar sub layout, this is an abstraction of that for simplicity.
function SubLayout(props) {
    return (
        <>
            <div className="hidden md:block">
                <img style={{ height: '640px', width: '480px' }} src={props.imgUrl} alt="" />
            </div>
            <div className="mt-8 flex flex-col w-11/12 md:w-9/12 mx-auto">{props.children}</div>
        </>
    )
}

function Stage0(props) {
    //Go back a stage in the sign up flow
    const handleBackClick = () => {
        props.retreatStage()
    }
    return (
        <SubLayout imgUrl="/signup-pic3.jpg">
            <LoadingBar stage={0} loaded={5} handleClick={handleBackClick} />
            <h5 className="mt-5 font-semibold text-lg">Sign up method</h5>
            <p>You can sign up manually or use an account on another platform</p>
            <div className="flex justify-center">
                <ExternalProviders />
            </div>

            <button className="mt-4 bg-black text-white font-bold w-full py-2" onClick={props.advanceStage}>
                Skip
            </button>
        </SubLayout>
    )
}

function Stage1(props) {
    //Go back a stage in the sign up flow
    const handleBackClick = () => {
        props.retreatStage()
    }
    const dispatch = useDispatch()
    const details = useSelector((state) => state.user.registrationInfo)
    console.log(details)
    const email = details && details.email ? details.email : ''
    const username = details && details.username ? details.username : ''
    const password = details && details.password ? details.password : ''
    const [existsError, setExistsError] = useState('')
    console.log(existsError)
    return (
        <SubLayout imgUrl="/signup-pic3.jpg">
            <LoadingBar stage={1} loaded={20} handleClick={handleBackClick} />

            <h3 className="mt-12 font-extrabold text-2xl">Your details</h3>

            <Formik
                initialValues={{ email, username, password }}
                validate={(values) => {
                    const errors = {}
                    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = 'Invalid email address'
                    }
                    if (values.username && !/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/i.test(values.username)) {
                        errors.username = 'Invalid username'
                    }
                    if (
                        values.password &&
                        !/^(?:(?=.*?[A-Z])(?:(?=.*?[0-9])(?=.*?[-!@#$%^&*()_[\]{},.<>+=])|(?=.*?[a-z])(?:(?=.*?[0-9])|(?=.*?[-!@#$%^&*()_[\]{},.<>+=])))|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-!@#$%^&*()_[\]{},.<>+=]))[A-Za-z0-9!@#$%^&*()_[\]{},.<>+=-]{7,50}$/i.test(
                            values.password
                        )
                    ) {
                        errors.password = 'Password is not strong enough'
                    }
                    return errors
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    const res = await dispatch(emailUsernameExist(values.email, values.username, values.password))
                    if (res.payload.error !== '') {
                        return setExistsError(res.payload.error)
                    }
                    setExistsError('')
                    props.advanceStage()
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="flex flex-col mt-4 w-full space-y-4">
                        <div className="">
                            <label className="mt-8 font-semibold" htmlFor="email">
                                Username
                            </label>
                            <ErrorMessage className="text-red-500" name="username" component="div" />
                            <Field
                                className={`form-input p-2 w-full border border-gray-400 rounded ${
                                    existsError === 'username' ? 'border-red-500' : 'border-gray-400'
                                } focus:outline-none placeholder-gray-500 active:bg-white`}
                                placeholder="Username"
                                type="text"
                                name="username"
                                defaultValue={username}
                                id="username"
                                required
                            />
                        </div>
                        {(details === null || details.externalId === undefined) && (
                            <div className="space-y-4">
                                <div className="">
                                    <label className="mt-8 font-semibold" htmlFor="email">
                                        Email address
                                    </label>
                                    <ErrorMessage className="text-red-500" name="email" component="div" />
                                    <Field
                                        className={`form-input p-2 w-full border border-gray-400 rounded${
                                            existsError === 'email' ? 'border-red-500' : 'border-gray-400'
                                        } focus:outline-none placeholder-gray-500 active:bg-white`}
                                        placeholder="Email"
                                        type="email"
                                        name="email"
                                        defaultValue={email}
                                        id="email"
                                        required
                                    />
                                </div>

                                <div className="">
                                    <label className="mt-8 font-semibold" htmlFor="email">
                                        Password
                                    </label>
                                    <ErrorMessage className="text-red-500" name="password" component="div" />
                                    <Field
                                        className={`form-input p-2 w-full border border-gray-400 rounded focus:outline-none placeholder-gray-500 active:bg-white`}
                                        placeholder="••••••••••••••"
                                        type="password"
                                        name="password"
                                        defaultValue={password}
                                        id="password"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <div className="">
                            <h5 className="mb-1 font-semibold">Your location</h5>
                            <select className="p-2 w-full border border-gray-400 rounded">
                                <option>United Kingdom</option>
                                <option>United States</option>
                            </select>
                        </div>
                        <div className="mt-6 flex items-center">
                            <input className="mr-3 h-5 w-5" type="checkbox" name="updates" id="updates" />
                            <label className="text-xs leading-tight" htmlFor="updates">
                                Get emails from Depop, including special promotions and selling tips.
                            </label>
                        </div>
                        {existsError.length > 0 && (
                            <p className="text-red-500 mt-6 flex items-center">
                                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>{' '}
                                {existsError} is taken
                            </p>
                        )}
                        <button
                            className="mt-10 text-white bg-black w-full py-3 font-bold hover:bg-gray-900"
                            disabled={isSubmitting}
                            type="submit"
                        >
                            Next
                        </button>
                    </Form>
                )}
            </Formik>
        </SubLayout>
    )
}

function Stage2(props) {
    const handleBackClick = () => {
        props.retreatStage()
    }
    const dispatch = useDispatch()
    const [phoneNumber, setPhoneNumber] = useState('')
    return (
        <SubLayout imgUrl="/signup-pic1.jpg">
            <LoadingBar stage={2} loaded={40} handleClick={handleBackClick} />

            <h3 className="mt-12 font-extrabold text-2xl">SIGN UP</h3>
            <p className="text-gray-600 text-sm">
                To create your account, we need to verify your phone number. We will never display this <br /> number
                publicly
            </p>

            <h5 className="mt-8 font-extrabold">Enter phone number</h5>
            <form className="mt-4" action="" onSubmit={(e) => e.preventDefault()}>
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
                        className="form-input border border-gray-400 p-2 rounded-r rounded-l-none focus:outline-none w-full"
                        type="tel"
                        placeholder="Phone number"
                        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                        name="phone-number"
                        id="phone-number"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>

                <input
                    onClick={() => {
                        dispatch(createRegistrationSms(phoneNumber))
                        props.advanceStage()
                    }}
                    className="w-full mt-6 bg-black text-white py-2 font-extrabold cursor-pointer hover:bg-gray-900"
                    type="submit"
                    value="Send code"
                />
            </form>
        </SubLayout>
    )
}

function Stage3(props) {
    const dispatch = useDispatch()
    const smsVerifcationToken = useSelector((state) => state.user.registrationInfo.smsVerifcationToken)
    const verificationCode = useSelector((state) => state.user.registrationInfo.verificationCode)
    const codesParent = useRef(null)

    const [codeValues, setCodeValues] = useState(['', '', '', '', '', ''])
    const [error, setError] = useState('')

    //Go back a stage in the sign up flow
    const handleBackClick = () => {
        props.retreatStage()
    }

    //When focusing the code input, select all text
    const handleFocus = (event) => {
        event.target.select()
    }

    const handleChange = (event, index) => {
        //Check that the input is a number or nothing (if they are deleting their input)
        if (/(^[0-9]+$|^$)/.test(event.target.value)) {
            let newCodeValues = [...codeValues]
            newCodeValues[index] = event.target.value
            setCodeValues(newCodeValues)

            //Focus the next code input once the current one has an input provided
            if (event.target.value != '' && index != 5) {
                codesParent.current.children[index + 1].focus()
            }
        }
    }

    const renderCodeInputs = (n) => {
        let codeInputs = []
        for (let i = 0; i < n; i++) {
            codeInputs.push(
                <input
                    key={i}
                    className={`form-input h-12 w-12 text-center font-semibold text-lg rounded focus:border-black border ${
                        codeValues[i] === '' ? 'border-gray-400' : 'border-black'
                    }`}
                    type="text"
                    name={`code${i}`}
                    pattern="[0-9]"
                    inputMode="numeric"
                    id="phone-code-input"
                    maxLength="1"
                    autoComplete="off"
                    onFocus={handleFocus}
                    onChange={(e) => handleChange(e, i)}
                    value={codeValues[i]}
                />
            )
        }
        return codeInputs
    }

    return (
        <SubLayout imgUrl="/signup-pic2.jpg">
            <LoadingBar stage={3} loaded={60} handleClick={handleBackClick} />

            <h3 className="mt-12 font-extrabold text-2xl">GOT YOUR CODE?</h3>
            <p className="text-gray-600 text-sm">We've sent a 6-digit code to +44XXXXXXXXXXX</p>

            <h5 className="mt-8 font-extrabold">Enter the code</h5>
            <form className="mt-4">
                <div className="flex justify-between" ref={codesParent}>
                    {renderCodeInputs(6)}
                </div>
                {error.length > 0 && (
                    <p className="text-red-500 mt-6 flex items-center">
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                            ></path>
                        </svg>{' '}
                        {error}
                    </p>
                )}
                Can only register one number with twilio dev, so here's the code: {verificationCode}
                <button
                    onClick={async (e) => {
                        e.preventDefault()
                        const code = codeValues.join('')
                        const res = await dispatch(verifyRegistrationSms(code, smsVerifcationToken))
                        if (res.type !== 'VERIFYREGISTRATIONSMS_SUCCESS') {
                            return setError('Invalid code')
                        }
                        props.advanceStage()
                    }}
                    className="mt-7 text-white bg-black w-full py-3 font-bold hover:bg-gray-900"
                >
                    Verify account
                </button>
            </form>

            <p className="mt-3 text-sm">
                Haven't received your code? <span className="underline">Check your number</span>
            </p>
        </SubLayout>
    )
}

function Stage4(props) {
    const details = useSelector((state) => state.user.registrationInfo)
    const dispatch = useDispatch()
    //Go back a stage in the sign up flow
    const handleBackClick = () => {
        props.retreatStage()
    }

    const [error, setError] = useState('')

    return (
        <SubLayout imgUrl="/signup-pic4.jpg">
            <LoadingBar stage={4} loaded={80} handleClick={handleBackClick} />

            <h3 className="mt-12 font-extrabold text-2xl">DEPOP TERMS</h3>
            <p className="text-md mt-4">
                Depop is a social media-inspired marketplace which uses artificial intelligence to suggest buyers,
                sellers and items based on user preferences and other information submitted to us.
            </p>
            <p className="mt-4">
                Your use of Depop is subject to our Terms of Service and our Privacy Police which sets out how we use
                your personal data
            </p>

            <div className="flex space-x-5 mt-4">
                <p className="underline">Terms of Service</p>
                <p className="underline">Privacy Policy</p>
            </div>

            {error.length > 0 && (
                <p className="text-red-500 mt-6 flex items-center">
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                        ></path>
                    </svg>{' '}
                    {error}
                </p>
            )}

            <button
                onClick={() => {
                    if (!details.smsVerified) {
                        setError('There was a problem registering your account')
                    }
                    dispatch(
                        register({
                            email: details.email,
                            phoneNumber: details.phoneNumber,
                            externalId:
                                details.externalId === undefined || details.externalId === ''
                                    ? null
                                    : details.externalId,
                            password:
                                details.password === undefined || details.password === '' ? null : details.password,
                            username:
                                details.username === undefined || details.username === '' ? null : details.username,
                        })
                    )
                    props.advanceStage()
                }}
                className="mt-7 text-white bg-black w-full py-3 font-bold hover:bg-gray-900"
            >
                Create Account
            </button>

            <p className="mt-3 text-xs text-center text-gray-500">
                By continuining you accept Billpop's Terms of Service
            </p>
        </SubLayout>
    )
}

function Stage5() {
    const userId = useSelector((state) => state.user.id)
    const [image, setImage] = useState()

    const uploadProfileImage = async () => {
        console.log(image)
        const formData = new FormData()
        formData.append('file', image[0])
        let uploadImagesResponse = await api.post('/user/uploadimage', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }

    return (
        <SubLayout imgUrl="/signup-pic5.jpg">
            {/* Complete loading bar */}
            <div className="mx-auto relative h-16 w-16 rounded-full border-2 border-green-500">
                <svg className="absolute left-3 top-3 h-9 w-9 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                    ></path>
                </svg>
            </div>
            <div className="mt-4 flex w-full justify-center items-center">
                <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-dashed border-red-500 cursor-pointer hover:bg-red-500 hover:text-white">
                    <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span className="mt-2 text-md font-semibold">Select a profile image</span>
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => setImage(e.currentTarget.files)}
                    />
                </label>
            </div>
            <button
                className="w-7/12 mx-auto mt-4 px-4 py-2 bg-gray-600 text-white rounded"
                onClick={uploadProfileImage}
            >
                Upload
            </button>

            <h3 className="mt-8 font-extrabold text-2xl">GET READY</h3>
            <p className="text-gray-600 text-sm">Now you can buy and sell unique items of Billpop.</p>

            <h5 className="mt-8 font-extrabold">Download the app</h5>
            <form className="mt-3 w-full" action="">
                <div className="flex w-full">
                    <select
                        className="w-16 px-1 border border-gray-400 rounded-l border-r-0 focus:outline-none"
                        name="phone-prefix"
                        id="phone-prexix"
                    >
                        <option value="+44">+44</option>
                        <option value="+1">+1</option>
                        <option value="+2">+2</option>
                    </select>
                    <input
                        className="form-input w-full border border-gray-400 p-2 rounded-l-none focus:outline-none"
                        type="tel"
                        placeholder="Phone Number"
                        name="phone-number"
                        id="phone-number"
                    />
                </div>

                <input
                    className="w-full mt-2 py-2 border border-black font-bold text-black text-lg bg-white"
                    type="submit"
                    value="Get the app"
                />
            </form>

            <Link href="/">
                <button className="mt-12 text-white bg-black w-full py-3 font-bold hover:bg-gray-900">
                    Back to Billpop
                </button>
            </Link>
        </SubLayout>
    )
}

export default function Signup() {
    const details = useSelector((state) => state.user.registrationInfo)
    const [stage, setStage] = useState(details === null ? 0 : 1)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [image, setImage] = useState()

    // Don't need to restrict the ability to go below stage 1 and above stage 5 because only exposing the ability to
    // change stages forwards and backwards where appropriate to each stage, aka stage 1 has no go back ability
    function nextStage() {
        setStage(stage + 1)
    }

    function decrementStage() {
        setStage(stage - 1)
    }

    return (
        <Layout title="Signup - Billpop" contained>
            <div className="max-w-5xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2">
                {stage === 0 && <Stage0 advanceStage={nextStage} />}
                {stage === 1 && <Stage1 advanceStage={nextStage} retreatStage={decrementStage} setImage={setImage} />}
                {stage === 2 && <Stage2 advanceStage={nextStage} retreatStage={decrementStage} />}
                {stage === 3 && <Stage3 advanceStage={nextStage} retreatStage={decrementStage} />}
                {stage === 4 && <Stage4 advanceStage={nextStage} retreatStage={decrementStage} />}
                {stage === 5 && <Stage5 retreatStage={decrementStage} />}
            </div>
        </Layout>
    )
}
