import Layout from '@/components/layout'
import AuthenticatedRoute from '@/components/HOC/AuthenticatedRoute'

import { useSelector } from 'react-redux'
import { useState } from 'react'

function EditProfile() {
    const user = useSelector((state) => state.user)

    const [profileFile, setProfileFile] = useState('https://billpopprodassets.blob.core.windows.net/images/u/3/profile')

    const profileFileChange = (e) => {
        setProfileFile(URL.createObjectURL(e.target.files[0]))
    }

    return (
        <Layout title="Edit Profile" contained>
            <div className="grid grid-cols-12 gap-3">
                <div className="col-span-2 border-r-2 py-6 border-gray-300">
                    <h3 className="font-bold text-lg">User Profile</h3>

                    <ul className="mt-6 space-y-2">
                        <li className="flex items-center border-r-2 border-orange-500 -mr-px">
                            <span>
                                <svg
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="user w-6 h-6 mr-2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </span>
                            User info
                        </li>
                        <li className="flex items-center">
                            <span>
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="cog w-6 h-6 mr-2">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1}
                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                            </span>
                            Settings
                        </li>
                    </ul>
                </div>

                <div className="col-span-6 col-start-4 py-6">
                    <section className="flex items-center">
                        <div className="relative">
                            <img className="h-32 w-32 rounded-full shadow-lg" src={profileFile} alt={user.username} />
                            <div>
                                <label
                                    className="absolute right-0 bottom-4 h-6 w-6 flex items-center justify-center rounded-full bg-orange-500 cursor-pointer"
                                    htmlFor="profile-file"
                                >
                                    <svg
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="pencil text-white w-4 h-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                        />
                                    </svg>
                                </label>
                                <input
                                    className="hidden"
                                    type="file"
                                    name="profile-file"
                                    id="profile-file"
                                    multiple="false"
                                    accept=".jpg,.jpeg,.png"
                                    onChange={(e) => profileFileChange(e)}
                                />
                            </div>
                        </div>
                        <div className="ml-16">
                            <h3 className="font-bold text-xl">{user.username}</h3>
                            <p className="text-gray-600 text-sm">Blackpool, UK</p>
                        </div>
                    </section>

                    <section className="mt-6">
                        <form className="flex justify-between">
                            <div className="flex flex-col">
                                <label className="pl-2 text-gray-600 text-sm" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    className="form-input text-center bg-gray-100 focus:bg-white"
                                    type="text"
                                    name="name"
                                    id="name"
                                    defaultValue={user.username}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="pl-2 text-gray-600 text-sm" htmlFor="location">
                                    Location
                                </label>
                                <input
                                    className="form-input text-center bg-gray-100 focus:bg-white"
                                    type="text"
                                    name="location"
                                    id="location"
                                    defaultValue="Blackpool"
                                />
                            </div>
                        </form>
                    </section>

                    <button className="mt-12 px-3 py-2 font-semibold text-white bg-orange-500 rounded">
                        Save Changes
                    </button>
                </div>
            </div>
        </Layout>
    )
}

export default AuthenticatedRoute(EditProfile)
