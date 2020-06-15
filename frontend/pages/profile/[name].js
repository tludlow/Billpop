import Layout from '@/components/layout'

import { useRouter } from 'next/router'

function Star() {
    return (
        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 11">
            <title>Full Star</title>
            <defs>
                <linearGradient id="review-star-0">
                    <stop offset="100%" stopColor="#ff2300"></stop>
                    <stop offset="0%" stopColor="#d7d7d7"></stop>
                </linearGradient>
            </defs>
            <path
                fill="url(#review-star-0)"
                fillRule="evenodd"
                d="M11.514 3.84H8.007a.486.486 0 01-.463-.322L6.464.322A.49.49 0 006 0a.49.49 0 00-.464.322l-1.08 3.196a.486.486 0 01-.463.322H.486a.475.475 0 00-.461.316.455.455 0 00.173.522l2.845 1.988a.45.45 0 01.176.516l-1.085 3.21c-.046.143-.02.3.073.42.092.12.238.19.393.188a.496.496 0 00.286-.092l2.826-1.974a.507.507 0 01.576 0l2.826 1.974c.083.06.183.091.286.092.155.002.3-.067.393-.188a.457.457 0 00.073-.42L8.78 7.182a.451.451 0 01.176-.516l2.845-1.988c.17-.118.24-.33.173-.522a.475.475 0 00-.461-.316z"
            ></path>
        </svg>
    )
}

export default function ProfilePage() {
    const router = useRouter()
    const { name } = router.query

    return (
        <Layout title={`${name}'s Shop - Billpop`}>
            <section className="mt-8 flex space-x-6">
                <img className="rounded-full h-24 w-24" src="/profile_img.png" alt="Profile" />
                <div className="flex flex-col justify-between">
                    <div className="">
                        <h2 className="font-bold text-3xl leading-tight">{name}</h2>
                        <p className="text-gray-400">@{name}</p>
                    </div>

                    <div className="flex items-center space-x-4">
                        <span className="flex space-x-1">
                            <Star /> <Star />
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
                    <button className="bg-purple-700 text-white font-bold px-6 py-1 hover:bg-green-700">Follow</button>
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
                    <div className="">
                        <div className="bg-red-400 h-48 w-full"></div>
                        <p>£11.00</p>
                    </div>
                    <div className="">
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
    )
}
