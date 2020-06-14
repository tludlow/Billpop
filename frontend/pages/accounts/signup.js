import Layout from '@/components/layout'
import { useState, useRef } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

function LoadingBar(props) {
    return (
        <>
            {props.stage > 1 && (
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

function Stage1(props) {
    return (
        <>
            <div className="hidden md:block">
                <img style={{ height: '640px', width: '480px' }} src="/signup-pic1.jpg" alt="" />
            </div>
            <div className="mt-8 flex flex-col w-11/12 md:w-9/12 mx-auto">
                <LoadingBar stage={1} loaded={20} />

                <h3 className="mt-12 font-extrabold text-2xl">SIGN UP</h3>
                <p className="text-gray-600 text-sm">
                    To create your account, we need to verify your phone number. We will never display this <br />{' '}
                    number publicly
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
                            className="border border-gray-400 p-2 rounded-r focus:outline-none w-full"
                            type="tel"
                            placeholder="Phone number"
                            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                            name="phone-number"
                            id="phone-number"
                        />
                    </div>

                    <input
                        onClick={props.advanceStage}
                        className="w-full mt-6 bg-black text-white py-2 font-extrabold cursor-pointer"
                        type="submit"
                        value="Send code"
                    />
                </form>
            </div>
        </>
    )
}

function Stage2(props) {
    const codesParent = useRef(null)

    const [codeValues, setCodeValues] = useState(['', '', '', '', '', ''])

    //Go back a stage in the sign up flow
    const handleBackClick = () => {
        console.log('going back')
        console.log(props)
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
                    className={`h-12 w-12 text-center font-semibold text-lg rounded border ${
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
        <>
            <div className="hidden md:block">
                <img style={{ height: '640px', width: '480px' }} src="/signup-pic2.jpg" alt="" />
            </div>
            <div className="mt-8 flex flex-col w-11/12 md:w-9/12 mx-auto">
                <LoadingBar stage={2} loaded={40} handleClick={handleBackClick} />

                <h3 className="mt-12 font-extrabold text-2xl">GOT YOUR CODE?</h3>
                <p className="text-gray-600 text-sm">We've sent a 6-digit code to +44XXXXXXXXXXX</p>

                <h5 className="mt-8 font-extrabold">Enter the code</h5>
                <form className="mt-4">
                    <div className="flex justify-between" ref={codesParent}>
                        {renderCodeInputs(6)}
                    </div>

                    <button className="mt-7 text-white bg-black w-full py-3 font-bold hover:bg-gray-900">
                        Verify account
                    </button>
                </form>

                <p className="mt-3 text-sm">
                    Haven't received your code? <span className="underline">Check your number</span>
                </p>
            </div>
        </>
    )
}

export default function Signup() {
    const [stage, setStage] = useState(1)
    const [phoneNumber, setPhoneNumber] = useState('')

    function nextStage() {
        console.log('Going forward')
        setStage(stage + 1)
    }

    function decrementStage() {
        console.log('Going backwards')
        setStage(stage - 1)
    }

    return (
        <Layout title="Signup - Billpop">
            {/* Auth warning for oauth when no account created or linked */}
            {/* <div className="bg-red-300 bg-opacity-55 p-4 rounded flex">
                <svg className="h-5 w-5 my-1 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fill-rule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                    ></path>
                </svg>
                <div className="text-white ml-4">
                    <h4 className="font-bold">Auth error</h4>
                    <p>
                        You tried to log in using your other account but you havent yet got a billpop account. Make one
                        now to connect the accounts.
                    </p>
                </div>
            </div> */}
            <div className="max-w-5xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2">
                {stage === 1 && <Stage1 advanceStage={nextStage} />}
                {stage === 2 && <Stage2 advanceStage={nextStage} retreatStage={decrementStage} />}
            </div>
        </Layout>
    )
}
