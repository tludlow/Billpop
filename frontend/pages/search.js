import Layout from '@/components/layout'
import ClothesImage from '@/components/clothes-image'
import { useState } from 'react'

export default function Search() {
    const [showRecommends, setShowRecommends] = useState(false)

    return (
        <Layout title="Search - Billpop" contained>
            <form className="relative mt-6 w-full" action="">
                <input
                    className="w-full border-b border-gray-300 placeholder-gray-300 text-5xl font-bold focus:outline-none focus:border-gray-600"
                    type="text"
                    placeholder="Search"
                    onFocus={() => setShowRecommends(true)}
                    onBlur={() => setShowRecommends(false)}
                />
                <div
                    className={`${
                        showRecommends ? 'absolute' : 'hidden'
                    } mt-2 w-full p-6 bg-white rounded-b-lg shadow z-30`}
                >
                    <h4 className="text-lg font-semibold">Recommended</h4>

                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="mt-4 flex flex-col space-y-2">
                            <p>Products</p>
                            <div className="h-16 py-1 flex cursor-pointer hover:bg-gray-50">
                                <img
                                    className="h-16 w-16"
                                    src="https://images.unsplash.com/photo-1556316918-880f9e893822?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80"
                                    alt=""
                                />
                                <div className="ml-3 flex flex-col">
                                    <p className="font-semibold">Chickens</p>
                                    <p>A bird which is tasty and full of mainly white meat</p>
                                </div>
                            </div>
                            <div className="h-16 py-1 flex cursor-pointer hover:bg-gray-50">
                                <img
                                    className="h-16 w-16"
                                    src="https://images.unsplash.com/photo-1556316918-880f9e893822?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80"
                                    alt=""
                                />
                                <div className="ml-3 flex flex-col">
                                    <p className="font-semibold">Chickens</p>
                                    <p>A bird which is tasty and full of mainly white meat</p>
                                </div>
                            </div>
                            <div className="h-16 py-1 flex cursor-pointer hover:bg-gray-50">
                                <img
                                    className="h-16 w-16"
                                    src="https://images.unsplash.com/photo-1556316918-880f9e893822?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80"
                                    alt=""
                                />
                                <div className="ml-3 flex flex-col">
                                    <p className="font-semibold">Chickens</p>
                                    <p>A bird which is tasty and full of mainly white meat</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 lg:mt-4 flex flex-col">
                            <p>Tags</p>
                            <ul className="mt-2 list-inside list-disc space-y-1">
                                <li>Trousers</li>
                                <li>Shirts</li>
                                <li>Shoes</li>
                                <li>Jackets</li>
                                <li>Scammed ASOS Clothes</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </form>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <ClothesImage
                    src="https://d3170a3msf25m.cloudfront.net/assets/narrative/sellers/sadsac.jpg"
                    cost={Math.floor(Math.random() * (1000 - 100) + 100) / 100}
                />
                <ClothesImage
                    src="https://d3170a3msf25m.cloudfront.net/assets/narrative/sellers/sadsac.jpg"
                    cost={Math.floor(Math.random() * (1000 - 100) + 100) / 100}
                />
                <ClothesImage
                    src="https://d3170a3msf25m.cloudfront.net/assets/narrative/sellers/sadsac.jpg"
                    cost={Math.floor(Math.random() * (1000 - 100) + 100) / 100}
                    sold={true}
                />
                <ClothesImage
                    src="https://d3170a3msf25m.cloudfront.net/assets/narrative/sellers/sadsac.jpg"
                    cost={Math.floor(Math.random() * (1000 - 100) + 100) / 100}
                />

                <ClothesImage
                    src="https://d3170a3msf25m.cloudfront.net/assets/narrative/sellers/sadsac.jpg"
                    cost={Math.floor(Math.random() * (1000 - 100) + 100) / 100}
                    sold={true}
                />
                <ClothesImage
                    src="https://d3170a3msf25m.cloudfront.net/assets/narrative/sellers/sadsac.jpg"
                    cost={Math.floor(Math.random() * (1000 - 100) + 100) / 100}
                />
            </div>
        </Layout>
    )
}
