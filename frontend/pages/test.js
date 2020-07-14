import Layout from '@/components/layout'
import { useState, useRef } from 'react'

export default function Test() {
    //Tag
    // {
    //     title: "testing",
    //     x: 123
    //     y: 123
    // }
    const [tags, setTags] = useState([])
    const [showTags, setShowTags] = useState(false)
    const tagParent = useRef()

    const getLocationRelativeToParent = (e) => {
        console.log(tagParent)
        const clickX = e.pageX
        const clickY = e.pageY
        const parentLeft = tagParent.current.x
        const parentTop = tagParent.current.y
        const parentWidth = tagParent.current.width
        const parentHeight = tagParent.current.height

        // console.log('Adding tag at: (', clickX, clickY, ')')
        // console.log(`relative tag position: (${clickX - parentLeft}, ${clickY - parentTop})`)
        // console.log(
        //     `percentage relative position: (${((clickX - parentLeft) / parentWidth) * 100}, ${
        //         ((clickY - parentTop) / parentHeight) * 100
        //     })`
        // )

        let currentTags = [...tags]
        currentTags.push({
            title: 'Wow',
            x: ((clickX - parentLeft) / parentWidth) * 100,
            y: ((clickY - parentTop) / parentHeight) * 100,
        })
        setTags(currentTags)
    }

    const removeTag = (idx) => {
        let currentTags = [...tags]
        currentTags.splice(idx, 1)
        setTags(currentTags)
    }

    return (
        <Layout title="Testing - Billpop" contained>
            <section className="mt-12">
                <h1 className="font-semibold text-lg mb-6">Click on the image to add a tag</h1>
                <div className="w-1/2 h-1/2 relative">
                    <img
                        ref={tagParent}
                        onClick={(e) => getLocationRelativeToParent(e)}
                        className="w-full h-full cursor-pointer hover:shadow"
                        src="/about-img2.jpg"
                        alt="Headquarters"
                    />
                    {showTags &&
                        tags.map((tag, i) => (
                            <div
                                key={i}
                                className="tag absolute bg-black text-white flex items-center px-1 rounded transform -translate-x-1/2 -translate-y-1/2"
                                style={{ left: `${tag.x}%`, top: `${tag.y}%` }}
                            >
                                <span>
                                    {tag.title} ({i})
                                </span>
                                <svg
                                    onClick={() => removeTag(i)}
                                    className="h-4 w-4 ml-2 cursor-pointer"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                            </div>
                        ))}
                </div>
                <button
                    onClick={() => setShowTags(!showTags)}
                    className="mt-4 px-2 py-1 bg-black text-white rounded shadow"
                >
                    Toggle Tags
                </button>
                {showTags ? (
                    <p className="mt-2 text-green-600">Tags Visibile</p>
                ) : (
                    <p className="mt-2 text-red-600">Tags Hidden</p>
                )}
                <p>Total tags: {tags.length}</p>
            </section>
        </Layout>
    )
}
