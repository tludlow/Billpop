import Layout from '@/components/layout'
import DownloadAppModal from '@/components/modals/downloadapp'
import { useRouter } from 'next/router'
import { useState } from 'react'

function Star() {
    return (
        <svg className="h-6 w-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
    )
}

function EmptyStar() {
    return (
        <svg className="h-6 w-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
    )
}

export default function ProfilePage() {
    const router = useRouter()
    const { name } = router.query

    const [downloadModalOpen, setDownloadModalOpen] = useState(false)

    function handleClose() {
        setDownloadModalOpen(false)
    }

    return (
        <>
            <Layout title={`${name}'s Shop - Billpop`} contained>
                <section className="mt-8 flex space-x-6">
                    <img className="rounded-full h-24 w-24" src="/profile_img.png" alt="Profile" />
                    <div className="flex flex-col justify-between">
                        <div className="">
                            <h2 className="font-bold text-3xl leading-tight">{name}</h2>
                            <p className="text-gray-400">@{name}</p>
                        </div>

                        <div className="flex items-center space-x-4">
                            <span className="flex space-x-1">
                                <Star /> <Star /> <EmptyStar /> <EmptyStar /> <EmptyStar />
                            </span>
                            <p className="cursor-pointer hover:underline">
                                <span className="font-bold">101</span> Reviews
                            </p>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="mt-8 flex items-center space-x-4">
                        <p>
                            <span className="font-bold">982</span> Followers
                        </p>
                        <p>
                            <span className="font-bold">1820</span> Following
                        </p>
                        <button
                            onClick={() => setDownloadModalOpen(!downloadModalOpen)}
                            className="bg-purple-700 text-white font-bold px-6 py-1 hover:bg-green-700"
                        >
                            Follow
                        </button>
                    </div>

                    <div className="mt-3">
                        <p className="font-light">
                            This is the description theoretically we should make it include spaces and formatting?
                        </p>
                    </div>
                </section>

                <section className="mt-8">
                    <div className="flex space-x-3">
                        <h4 className="text-lg font-bold">Selling</h4>
                        <h4 className="text-lg">Likes</h4>
                    </div>

                    <div className="mt-2 grid grid-cols-6 gap-3">
                        <div className="relative">
                            <div className="opacity-0 hover:opacity-25 absolute bg-gray-800 h-48 w-full"></div>
                            <div className="bg-red-400 h-48 w-full"></div>
                            <p>£11.00</p>
                        </div>
                        <div className="relative">
                            <p className="w-full h-24 absolute mx-auto text-center top-20 text-yellow-200 font-semibold text-xl">
                                SOLD
                            </p>
                            <div className="bg-red-400 h-48 w-full"></div>
                            <p>£11.00</p>
                        </div>
                        <div className=""></div>
                        <div className=""></div>
                        <div className=""></div>
                        <div className=""></div>
                    </div>
                </section>
            </Layout>
            <DownloadAppModal modalOpen={downloadModalOpen} closeModal={handleClose} />
        </>
    )
}
