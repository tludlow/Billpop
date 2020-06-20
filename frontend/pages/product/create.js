import Layout from '@/components/layout'
import TagList from '@/components/taglist'

export default function CreateListing() {
    return (
        <Layout title="Create a listing - Billpop" contained>
            <div className="mt-12 grid grid-cols-2 gap-8">
                <div className="w-full">
                    <h4 className="font-bold text-lg">Images</h4>
                    <p>Upload up to 5 images to display your product for others to see</p>

                    <form action="">
                        <div className="mt-8 flex w-full items-center">
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
                <div className="w-full">
                    <h4 className="font-bold text-lg">Product Details</h4>
                    <p>Enter the information about your product</p>

                    <TagList setTags="" />
                </div>
            </div>
        </Layout>
    )
}
