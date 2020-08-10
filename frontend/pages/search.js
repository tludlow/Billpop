import Layout from '@/components/layout'
import ClothesImage from '@/components/clothes-image'
import { useState, useEffect } from 'react'
import api from '../lib/api'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Search() {
    const router = useRouter()
    const initialQuery = router.query.query
    const [showRecommends, setShowRecommends] = useState(false)
    const [searchQuery, setSearchQuery] = useState(initialQuery || '')
    const [listings, setListings] = useState([])

    useEffect(() => {
        console.log('test')
        const executeAsync = async () => {
            setListings((await api.get(`/listing/search?query=${initialQuery || ''}&number=50`)).data.listings)
        }
        executeAsync()
    }, [initialQuery])

    const submit = async (e) => {
        e.preventDefault()
        setShowRecommends(false)
        router.push(`/search?query=${searchQuery}`, undefined, { shallow: true })
    }

    return (
        <Layout title="Search - Billpop" contained>
            <Link href="/listing/create">
                <a className="inline-block mt-4 px-4 py-2 rounded text-white bg-blue-600" href="">
                    Create New Listing
                </a>
            </Link>
            <form className="relative mt-6 w-full" onSubmit={submit} action="">
                <input
                    className="w-full border-b border-gray-300 placeholder-gray-300 text-5xl font-bold focus:outline-none focus:border-gray-600"
                    type="text"
                    placeholder={'Search'}
                    defaultValue={initialQuery}
                    onFocus={() => setShowRecommends(true)}
                    onBlur={() => setShowRecommends(false)}
                    onChange={(e) => setSearchQuery(e.currentTarget.value)}
                />
                <div
                    className={`${
                        showRecommends ? 'absolute' : 'hidden'
                    } mt-2 w-full p-6 bg-white rounded-b-lg shadow z-30 border border-gray-100`}
                >
                    <h4 className="text-lg font-semibold">Recommended</h4>

                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="mt-4 flex flex-col space-y-2">
                            <p>Listings</p>
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
                {listings.map((listing, i) => (
                    <ClothesImage
                        key={i}
                        title={listing.title}
                        cost={listing.price}
                        listingId={listing.id}
                        sold={false}
                        src={`${process.env.NEXT_PUBLIC_IMAGE_STORE}/l/${listing.id}/0`}
                    />
                ))}
            </div>
        </Layout>
    )
}
