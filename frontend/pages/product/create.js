import Layout from '@/components/layout'
import TagList from '@/components/taglist'

export function CloseIcon() {
    return (
        <svg
            className="absolute h-4 w-4 top-1 right-1 text-gray-600 cursor-pointer"
            fill="currentColor"
            viewBox="0 0 20 20"
        >
            <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
            ></path>
        </svg>
    )
}

export default function CreateListing() {
    return (
        <Layout title="Create a listing - Billpop" contained>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="w-full">
                    <h4 className="font-bold text-lg">Images</h4>
                    <p>Upload up to 5 images to display your product for others to see</p>

                    <div className="mt-6 w-full h-96 bg-gray-100 border border-dashed border-gray-400 flex justify-center items-center">
                        <form action="">
                            <div className="flex w-full items-center">
                                <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-dashed border-red-500 cursor-pointer hover:bg-red-500 hover:text-white">
                                    <svg
                                        className="w-8 h-8"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                    </svg>
                                    <span className="mt-2 text-md font-semibold">Select your images</span>
                                    <input type="file" className="hidden" />
                                </label>
                            </div>
                        </form>
                    </div>
                    <div className="mt-2 grid grid-cols-3 md:grid-cols-5 gap-3">
                        <div className="relative h-28 w-full bg-gray-100 border border-dashed border-gray-400">
                            <CloseIcon />
                        </div>
                        <div className="relative h-28 w-full bg-gray-100 border border-dashed border-gray-400">
                            <CloseIcon />
                        </div>
                        <div className="relative h-28 w-full bg-gray-100 border border-dashed border-gray-400">
                            <CloseIcon />
                        </div>
                        <div className="relative h-28 w-full bg-gray-100 border border-dashed border-gray-400">
                            <CloseIcon />
                        </div>
                        <div className="relative h-28 w-full bg-gray-100 border border-dashed border-gray-400">
                            <CloseIcon />
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <h4 className="font-bold text-lg">Product Details</h4>
                    <p>Enter the information about your product</p>

                    <form className="space-y-4" action="">
                        <div className="mt-5 flex flex-col">
                            <label className="font-semibold" htmlFor="title">
                                Title
                            </label>
                            <input className="form-input w-4/5" type="text" name="title" id="title" />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold" htmlFor="about">
                                About
                            </label>
                            <textarea
                                className="form-textarea w-4/5"
                                name="about"
                                id="about"
                                cols="30"
                                rows="4"
                            ></textarea>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="price">Price</label>
                            <div className="flex">
                                <p className="h-full w-4 flex items-center justify-center rounded-l rounded-r-none bg-gray-100 py-2 px-3 border border-gray-200">
                                    £
                                </p>
                                <input type="text" className="form-input border-r-0 rounded-none border-l-0" />
                                <select className="form-select rounded-l-none" name="currency" id="currency">
                                    <option value="GBP">GBP</option>
                                    <option value="EUR">EUR</option>
                                </select>
                            </div>
                        </div>
                    </form>

                    <TagList setTags="" />
                </div>
            </div>
        </Layout>
    )
}
