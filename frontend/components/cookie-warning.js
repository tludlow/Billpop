import { acceptCookies } from '../actions/cookieActions'
import { useSelector, useDispatch } from 'react-redux'

export default function CookieWarning(props) {
    //TODO MOVE THE COOKIE POLICY TO USING COOKIES, NOT REDUX
    const cookies = useSelector((state) => state.cookies)
    const dispatch = useDispatch()

    return (
        <div
            className={`${
                !cookies.acceptCookies ? 'fixed z-20' : 'hidden'
            } w-10/12 md:w-auto bottom-4 left-7 md:bottom-16 md:left-12 rounded shadow bg-white p-4 border border-red-200`}
        >
            <div className="flex justify-between mb-2">
                <h5 className="font-semibold text-lg">Cookies</h5>
                <svg
                    onClick={() => dispatch(acceptCookies())}
                    className="h-5 w-5 text-black cursor-pointer"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    ></path>
                </svg>
            </div>
            <p>
                By using Billpop you recognise, and a agree to our{' '}
                <span className="underline cursor-pointer">cookie policy</span>
            </p>
        </div>
    )
}
