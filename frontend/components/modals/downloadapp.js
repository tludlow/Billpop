import { useRef, useEffect } from 'react'

export default function DownloadApp(props) {
    const modalPanel = useRef()

    const handleClickOutsidePanel = (e) => {
        if (modalPanel.current.contains(e.target)) {
            return
        }
        props.closeModal()
    }

    useEffect(() => {
        if (props.modalOpen) {
            document.addEventListener('mousedown', handleClickOutsidePanel)
        } else {
            document.removeEventListener('mousedown', handleClickOutsidePanel)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutsidePanel)
        }
    }, [props.modalOpen])

    return (
        <div
            className={`${
                props.modalOpen
                    ? 'fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center z-30'
                    : 'hidden'
            } `}
        >
            {/* Background Overlay */}
            <div className={`${props.modalOpen ? 'opacity-100' : 'opacity-0'} fixed inset-0 transition-opacity`}>
                <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
            </div>

            {/* Modal Panel */}
            <div
                ref={modalPanel}
                className={`${
                    props.modalOpen
                        ? 'opacity-100 translate-y-0 sm:scale-100'
                        : 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                } relative bg-white p-1 py-3 md:p-5 rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-2xl sm:w-full`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
            >
                {/* Close button */}
                <div onClick={() => props.closeModal()} className="absolute top-5 right-5">
                    <svg className="h-5 w-5 text-gray-900 cursor-pointer" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </div>

                <div className="flex items-center justify-center space-x-1">
                    <svg
                        className="h-8 w-8 text-red-600"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                    </svg>
                    <h1 className="font-bold text-xl text-red-600">Billpop</h1>
                </div>

                <div className="mt-5 p-1 md:p-5 flex flex-col items-center">
                    <h2 className="font-bold text-lg">It's better on the app</h2>
                    <p className="text-center text-gray-600">
                        Download our app to buy, sell and discover unique items from all over the world. Curated for
                        you.
                    </p>

                    <form className="mt-6 w-11/12 md:w-7/12 flex flex-col items-center" action="">
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
                                className="w-full border border-gray-400 p-2 rounded-r focus:outline-none w-full"
                                type="tel"
                                placeholder="Phone Number"
                                name="phone-number"
                                id="phone-number"
                            />
                        </div>

                        <input
                            className="w-full bg-black text-white font-bold px-12 py-2 mt-3"
                            type="submit"
                            value="Get the App"
                        />
                    </form>

                    <div className="mt-6 flex items-center space-x-4">
                        <p className="bg-gray-600 text-white py-2 px-4 rounded">Google Play</p>
                        <p className="bg-gray-600 text-white py-2 px-4 rounded">Apple App Store</p>
                    </div>

                    <p className="mt-4 text-center">
                        Already have a Depop account? <span className="underline">Login</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
