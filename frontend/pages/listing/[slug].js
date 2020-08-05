import Layout from '@/components/layout'
import { useEffect, useState } from 'react'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image, Dot } from 'pure-react-carousel'
import { useRouter } from 'next/router'
import api from '../../lib/api'
import moment from 'moment'

export default function ListingPage() {
    const listingId = useRouter().query.slug
    const [listing, setListing] = useState()
    const [user, setUser] = useState()

    useEffect(() => {
        const executeAsync = async () => {
            let listingResponse = await (await api.get(`/listing/${listingId}`)).data.listing
            let userResponse = await (await api.get(`/user/${listingResponse.userId}`)).data
            setListing(listingResponse)
            setUser(userResponse)
        }
        if (listingId) {
            executeAsync()
        }
    }, [listingId])

    return (
        <Layout title="PRODUCT SLUG HERE - Billpop" contained>
            <div className="hidden md:mt-8 md:grid md:grid-cols-2 md:mb-32">
                <div className="w-full space-y-4">
                    <CarouselProvider
                        className="w-11/12 mt-2 relative mb-5"
                        naturalSlideWidth={100}
                        naturalSlideHeight={100}
                        totalSlides={5}
                        isPlaying={true}
                        interval={4000}
                        infinite={true}
                    >
                        <Slider>
                            <Slide index={0}>
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_STORE}/l/${listing && listing.id}/0`}
                                    alt=""
                                />
                            </Slide>
                            <Slide index={1}>
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_STORE}/l/${listing && listing.id}/1`}
                                    alt=""
                                />
                            </Slide>
                            <Slide index={2}>
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_STORE}/l/${listing && listing.id}/2`}
                                    alt=""
                                />
                            </Slide>
                            <Slide index={3}>
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_STORE}/l/${listing && listing.id}/3`}
                                    alt=""
                                />
                            </Slide>
                            <Slide index={4}>
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_STORE}/l/${listing && listing.id}/4`}
                                    alt=""
                                />
                            </Slide>
                        </Slider>

                        <ButtonBack>
                            <div className="absolute left-2 top-5/12 bg-white rounded-full w-5 h-5 shadow flex items-center justify-center">
                                <svg className="text-black w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </div>
                        </ButtonBack>
                        <ButtonNext>
                            <div className="absolute right-5 top-5/12 bg-white rounded-full w-5 h-5 shadow flex items-center justify-center">
                                <svg className="text-black w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </div>
                        </ButtonNext>
                        {/* <DotGroup className="-mt-3 flex items-center justify-center space-x-2"></DotGroup> */}

                        <div className="-mt-2 flex space-x-1">
                            <Dot slide={0} className="h-32 w-24 focus:outline-none" disabled={false}>
                                <Image
                                    className="h-32 w-24"
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_STORE}/l/${listing && listing.id}/0`}
                                    alt=""
                                />
                            </Dot>
                            <Dot slide={1} className="h-32 w-24 focus:outline-none" disabled={false}>
                                <Image
                                    className="h-32 w-24"
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_STORE}/l/${listing && listing.id}/1`}
                                    alt=""
                                />
                            </Dot>
                            <Dot slide={2} className="h-32 w-24 focus:outline-none" disabled={false}>
                                <Image
                                    className="h-32 w-24"
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_STORE}/l/${listing && listing.id}/2`}
                                    alt=""
                                />
                            </Dot>
                            <Dot slide={3} className="h-32 w-24 focus:outline-none" disabled={false}>
                                <Image
                                    className="h-32 w-24"
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_STORE}/l/${listing && listing.id}/3`}
                                    alt=""
                                />
                            </Dot>
                            <Dot slide={4} className="h-32 w-24 focus:outline-none" disabled={false}>
                                <Image
                                    className="h-32 w-24"
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_STORE}/l/${listing && listing.id}/4`}
                                    alt=""
                                />
                            </Dot>
                        </div>
                    </CarouselProvider>
                </div>

                <div className="px-6 md:w-full lg:w-8/12">
                    <div className="lg:sticky lg:top-20">
                        <div>
                            {user && (
                                <img
                                    className="w-15 h-15 rounded-full"
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_STORE}/u/${user.id}/profile`}
                                    alt="Billy's Product"
                                />
                            )}

                            <h5 className="mt-1 font-bold">{user && user.username}</h5>
                            <p>Blackpool, Yorkshire, United Kingdom</p>

                            <div className="mt-2 inline-flex items-center space-x-5">
                                <div className="flex items-center space-x-1">
                                    <svg className="h-3 w-3 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <span className="text-sm text-gray-400 font-semibold">351 SOLD</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <svg className="h-3 w-3 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <span className="text-sm text-gray-400 font-semibold">ACTIVE TODAY</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h5 className="mt-1 font-bold">{listing && listing.title}</h5>
                        </div>

                        <div className="mt-8">
                            <p>{listing && listing.about}</p>
                        </div>

                        <div className="mt-6 flex justify-between pb-1 border-b border-gray-300">
                            <p>Price</p>
                            <p>£{listing && listing.price}</p>
                        </div>

                        <select
                            className="mt-2 form-select w-full"
                            defaultValue="Choose size"
                            name="sizing"
                            id="sizing-select"
                        >
                            <option value="Choose size" disabled>
                                Choose size
                            </option>
                            <option value="6">6</option>
                            <option value="8">8</option>
                        </select>
                        <small className="text-gray-400">Listed {moment(listing && listing.created).fromNow()}</small>

                        <div className="mt-5 w-full p-3 flex border border-black">
                            <div className="flex-shrink-0 flex items-center ml-1 mr-5">
                                <svg className="w-8 h-8" viewBox="0 0 28 34">
                                    <title>Buyer Protection Badge</title>
                                    <path
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M25.47 10.21c-.014-.756-.027-1.47-.027-2.162a.97.97 0 00-.958-.98c-4.098 0-7.217-1.204-9.818-3.79a.943.943 0 00-1.335 0c-2.6 2.586-5.72 3.79-9.817 3.79a.97.97 0 00-.958.98c0 .691-.013 1.406-.027 2.162-.132 7.035-.312 16.67 11.156 20.736a.938.938 0 00.627 0C25.781 26.88 25.602 17.245 25.47 10.209zM9.482 17.332l3.325 3.334m0 0L19.457 14"
                                    ></path>
                                </svg>
                            </div>
                            <div className="">
                                <p>All purchases through Billpop are covered by Buyer Protection.</p>
                                <p className="text-red-500 cursor-pointer">Learn More</p>
                            </div>
                        </div>

                        <button className="mt-6 py-2 w-full bg-black text-white font-bold text-lg">Buy now</button>
                    </div>
                </div>
            </div>

            {/* Mobile view */}
            {/* <div className="md:hidden">
                <h2>billy is silly and deleted this page</h2>
            </div> */}
        </Layout>
    )
}
