import { useState } from 'react'

export default function TagList() {
    const [tags, setTags] = useState([])
    const [warning, setWarning] = useState('')

    //TODO PASS UP TAGS TO PARENT FROM INSIDE HERE

    const addTag = (tag) => {
        if (tags.length === 5) {
            setWarning('You can only have 5 tags per product')
            return
        }

        setWarning('')

        let currentTags = [...tags]
        currentTags.push(tag)
        setTags(currentTags)
    }

    const onChange = (e) => {
        if (e.target.value.trim() !== '' && (e.target.value.slice(-1) === ' ' || e.target.value.slice(-1) === ',')) {
            addTag(e.target.value.slice(0, -1).trim())
            e.target.value = ''
        }
    }

    const removeTag = (idx) => {
        setWarning('')
        let currentTags = [...tags]
        currentTags.splice(idx, 1)
        setTags(currentTags)
    }

    return (
        <div className="mt-5 flex flex-col">
            <p className="font-semibold">Tags</p>
            <div className="inline-flex flex-wrap mb-3 mt-1">
                {tags.map((tag, index) => (
                    <div
                        onClick={() => removeTag(index)}
                        key={index}
                        className="tag flex items-center bg-white shadow rounded px-3 py-1 border border-gray-200 mr-2 mt-1 cursor-pointer"
                    >
                        <p>{tag}</p>

                        <svg
                            onClick={() => removeTag(index)}
                            className="ml-3 h-4 w-3 text-black"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                ))}
            </div>
            {warning.length > 0 && <p className="text-red-500 mt-3">{warning}</p>}
            <input
                maxLength="16"
                disabled={tags.length === 8}
                onChange={(e) => onChange(e)}
                className="form-input w-full disabled:border disabled:border-red-500 disabled:cursor-not-allowed"
                type="text"
                placeholder="Enter a tag, use a space or comma to seperate them"
            />
        </div>
    )
}
