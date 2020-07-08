import { useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

function Star() {
    return (
        <svg className="h-6 w-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
    )
}

export default function Reviews(props) {
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
            <div
                id="modal-background"
                className={`${
                    props.modalOpen ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-300'
                } fixed inset-0 transition-opacity`}
            >
                <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
            </div>

            {/* Modal Panel */}
            <div
                id="modal-panel"
                ref={modalPanel}
                className={`${
                    props.modalOpen
                        ? 'opacity-100 translate-y-0 sm:scale-100 ease-out duration-300'
                        : 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95 ease-in duration-200'
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

                {/* Modal body */}
                <div className="mt-5 p-1 md:p-5 flex flex-col items-center">
                    <h2 className="font-bold text-lg">Feedback for {props.userName}</h2>

                    <div className="w-full mt-3 flex justify-between space-x-2">
                        <button className="w-1/2 py-2 border border-gray-400 focus:outline-none focus:border-gray-800 focus:border-2">
                            Sold
                        </button>
                        <button className="w-1/2 py-2 border border-gray-400 focus:outline-none focus:border-gray-800 focus:border-2">
                            Purchased
                        </button>
                    </div>

                    <div className="w-full mt-3 flex flex-col h-96 space-y-3 overflow-y-auto">
                        <div className="flex">
                            <img
                                className="h-36 w-36"
                                src="https://d2h1pu99sxkfvn.cloudfront.net/b0/5288872/625641800_7a247aa0870a4172b9f5145666819a97/P8.jpg"
                                alt="VANS Shoes"
                            />
                            <div className="ml-2 flex flex-col justify-between">
                                <div className="">
                                    <h4 className="font-semibold">@Jeffreythecoolguy</h4>
                                    <div className="flex mt-1">
                                        <Star /> <Star />
                                    </div>
                                    <p className="mt-1">Omg these are so beautiful we love it</p>
                                </div>
                                <small className="text-gray-600">3 months ago</small>
                            </div>
                        </div>
                        <div className="flex">
                            <img
                                className="h-36 w-36"
                                src="https://d2h1pu99sxkfvn.cloudfront.net/b0/5288872/625641800_7a247aa0870a4172b9f5145666819a97/P8.jpg"
                                alt="VANS Shoes"
                            />
                            <div className="ml-2 flex flex-col justify-between">
                                <div className="">
                                    <h4 className="font-semibold">@Jeffreythecoolguy</h4>
                                    <div className="flex mt-1">
                                        <Star /> <Star />
                                    </div>
                                    <p className="mt-1">Omg these are so beautiful we love it</p>
                                </div>
                                <small className="text-gray-600">3 months ago</small>
                            </div>
                        </div>
                        <div className="flex">
                            <img
                                className="h-36 w-36"
                                src="https://d2h1pu99sxkfvn.cloudfront.net/b0/5288872/625641800_7a247aa0870a4172b9f5145666819a97/P8.jpg"
                                alt="VANS Shoes"
                            />
                            <div className="ml-2 flex flex-col justify-between">
                                <div className="">
                                    <h4 className="font-semibold">@Jeffreythecoolguy</h4>
                                    <div className="flex mt-1">
                                        <Star /> <Star />
                                    </div>
                                    <p className="mt-1">Omg these are so beautiful we love it</p>
                                </div>
                                <small className="text-gray-600">3 months ago</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
