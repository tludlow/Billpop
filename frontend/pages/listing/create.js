import Layout from '@/components/layout'
import TagList from '@/components/taglist'
import { useState } from 'react'
import * as yup from 'yup'
import api from '../../lib/api'
import { useRouter } from 'next/router'
import CloseIcon from '@/components/close-icon'

function ImageUploadBox(props) {
    return (
        <div className="relative h-28 w-full bg-gray-100 border border-dashed border-gray-400">
            {props.file && <img src={props.file} style={{ height: '100%', width: '100%' }} />}
            <CloseIcon handleClose={props.removeImage} />
        </div>
    )
}

export default function CreateListing() {
    const router = useRouter()
    const [values, setValues] = useState({ title: '', about: '', price: 1, searchTags: [], currencyId: 1 })
    const [error, setError] = useState('')
    const [images, setImages] = useState([])

    const validationSchema = yup.object().shape({
        title: yup
            .string()
            .min(5, 'Title is too short (minumum of 5 characters)')
            .max(50, 'Title is too long (maximum of 50 characters)')
            .required(),
        about: yup
            .string()
            .min(10, 'About is too short (minimum of 10 characters)')
            .max(255, 'About is too long (maximum of 255 charactes)'),
        price: yup
            .number()
            .min(1, 'Cannot create listing for under £1')
            .max(10000, 'Cannot create listing for more than £10,000')
            .required(),
        tags: yup.array(),
    })

    const addImages = (e) => {
        setImages([...images, ...e.currentTarget.files].slice(0, 5))
    }

    const removeImage = (index) => {
        let imagesTemp = images
        imagesTemp.splice(index, 1)
        setImages([...imagesTemp])
    }

    const submit = async (e) => {
        e.preventDefault()
        try {
            await validationSchema.validate(values)
            if (images && images.length === 0) {
                throw { message: 'You must upload at least one picture of your item.' }
            }
        } catch (err) {
            return setError(err.message)
        }

        let listingResponse = await api.post('/listing/createlisting', values)
        const formData = new FormData()
        images.forEach((image, i) => formData.append(`file${i}`, image))
        formData.append('listingId', listingResponse.data.listingId)
        let uploadImagesResponse = await api.post('/listing/uploadimages', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        router.push(`/listing/${listingResponse.data.listingId}`)
    }

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
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        className="hidden"
                                        onChange={addImages}
                                    />
                                </label>
                            </div>
                        </form>
                    </div>
                    <div className="mt-2 grid grid-cols-3 md:grid-cols-5 gap-3">
                        {images &&
                            [...Array(5)].map((e, i) => (
                                <ImageUploadBox
                                    key={i}
                                    index={i}
                                    file={images[i] && URL.createObjectURL(images[i])}
                                    removeImage={() => removeImage(i)}
                                />
                            ))}
                    </div>
                </div>
                <div className="w-full">
                    <h4 className="font-bold text-lg">Product Details</h4>
                    <p>Enter the information about your product</p>

                    <form className="space-y-4" action="" onSubmit={submit}>
                        <div className="mt-5 flex flex-col">
                            <label className="font-semibold" htmlFor="title">
                                Title
                            </label>
                            <input
                                className="form-input w-4/5"
                                type="text"
                                name="title"
                                id="title"
                                onChange={(e) => setValues({ ...values, title: e.currentTarget.value })}
                            />
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
                                onChange={(e) => setValues({ ...values, about: e.currentTarget.value })}
                            ></textarea>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="price">Price</label>
                            <div className="flex">
                                <p className="h-full w-4 flex items-center justify-center rounded-l rounded-r-none bg-white py-2 px-3 border border-gray-300">
                                    £
                                </p>
                                <input
                                    type="text"
                                    className="form-input border-r-0 rounded-none border-l-0"
                                    defaultValue={1}
                                    onChange={(e) =>
                                        setValues({
                                            ...values,
                                            price: Number(parseFloat(e.currentTarget.value).toFixed(2)),
                                        })
                                    }
                                />
                                <select className="form-select rounded-l-none" name="currency" id="currency">
                                    <option value="GBP">GBP</option>
                                    <option value="EUR">EUR</option>
                                </select>
                            </div>
                        </div>
                        <div className="w-4/5">
                            <TagList
                                tags={values.searchTags}
                                setTags={(tags) => setValues({ ...values, searchTags: tags })}
                            />
                        </div>
                        {error.length > 0 && (
                            <p className="text-red-500 mt-6 flex items-center">
                                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>{' '}
                                {error}
                            </p>
                        )}
                        <button
                            className="mt-5 text-white bg-black w-full py-3 font-bold hover:bg-gray-900"
                            type="submit"
                        >
                            Create
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}
