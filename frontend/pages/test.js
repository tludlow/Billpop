import Layout from '@/components/layout'
import { useState, useRef } from 'react'

export default function Test() {
    //Tag
    // {
    //     title: "testing",
    //     x: 12  percent offset into parent
    //     y: 15   percent offset into parent
    // }

    //TODO FIX MOBILE BUG WHERE ON THE ACTUAL PHONE NOT A RESPONSIVE TAB THE TOP POSITION FOR THE TAG IS NEGATIVE WHEN IT SHOULD BE POSITIVE
    //THE API FOR THE PHONE IS PROBABLY DIFFERENT FOR FINDING THE ELEMENT POSITIONS...
    const [tags, setTags] = useState([])
    const [showTags, setShowTags] = useState(true)
    const tagParent = useRef()

    const getLocationRelativeToParent = (e) => {
        const clickX = e.pageX
        const clickY = e.pageY
        const parentLeft = tagParent.current.x
        const parentTop = tagParent.current.y
        const parentWidth = tagParent.current.width
        const parentHeight = tagParent.current.height

        // console.log('Adding tag at: (', clickX, clickY, ')')
        // console.log(`relative tag position: (${clickX - parentLeft}, ${clickY - window.pageYOffset})`)
        // console.log(`scrolled: ${window.pageYOffset}`)
        // console.log(
        //     `percentage relative position: (${((clickX - parentLeft) / parentWidth) * 100}, ${
        //         ((clickY - parentTop) / parentHeight) * 100
        //     })`
        // )

        //If the page has been scrolled at all the sticky/fixed navbar causes the placement of tags to be offset by twice the height of the navbar
        //We take account for that and also the fact that on mobile the navbar is taller so we do it programatically
        let currentTags = [...tags]
        currentTags.push({
            title: 'Wow',
            x: ((clickX - Math.abs(parentLeft)) / parentWidth) * 100,
            y:
                window.pageYOffset > 0
                    ? ((clickY - Math.abs(parentTop) - document.getElementById('navbar').clientHeight * 2) /
                          parentHeight) *
                      100
                    : ((clickY - Math.abs(parentTop)) / parentHeight) * 100,
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
                <div className="w-full h-full lg:w-1/2 lg:h-1/2 relative">
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
                                style={{ left: `${tag.x}%`, top: `${tag.y - 2.5}%` }}
                            >
                                <span className="z-10">
                                    {tag.title} ({i})
                                </span>
                                <svg
                                    onClick={() => removeTag(i)}
                                    className="h-4 w-4 ml-2 cursor-pointer"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>

                                <div
                                    className="absolute w-4 h-4 bg-black rounded transform rotate-45"
                                    style={{ left: '43%', bottom: '-5px' }}
                                ></div>
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
            <section className="mt-12">
                <div className="inline-flex relative px-2 py-1 bg-black text-white rounded">
                    <span className="z-10">hello wow this is cool</span>
                    <div
                        className="absolute w-4 h-4 bg-black rounded transform rotate-45"
                        style={{ left: '44%', bottom: '-5px' }}
                    ></div>
                </div>
            </section>
        </Layout>
    )
}
