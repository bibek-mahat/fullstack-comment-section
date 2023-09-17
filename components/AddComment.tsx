'use client'
import React from 'react'
import Image from 'next/image'

const AddComment = () => {

    const [comment, setComment] = React.useState('')
    const [commenting, setCommenting] = React.useState(false)

    const postComment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setCommenting(true)

        fetch('/api/post-comment', {
            method: 'POST',
            body: JSON.stringify({
                comment: comment,
                author: 'John Doe',
                createdAt: new Date().toLocaleString(),
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.message)
                setCommenting(false)
                setComment('')
            })
    }

    return (
        <div className='bg-white p-5 text-dark-blue relative rounded-md flex gap-5 mb-5 sm:flex-row items-start'>
            <Image
                src='/images/avatars/image-amyrobson.png'
                alt='your-avatar' height={50} width={50}
                className='sm:static sm:w-12 w-10 absolute bottom-5 left-5'
            />
            <form action="#" onSubmit={(e) => postComment(e)} className='flex flex-1 items-start gap-5'>
                <textarea
                    required
                    value={comment}
                    onChange={(e) => setComment(e.currentTarget.value)}
                    placeholder='Add a comment...'
                    name="comment" id="comment"
                    className='sm:mb-0 mb-[60px] placeholder-grayish-blue
                    resize-none border rounded-md w-full h-24 py-3 px-5 focus:border-moderate-blue focus:outline-none
                    '
                />
                <button
                    className='bg-moderate-blue text-white px-5 py-2 uppercase rounded-md font-medium hover:opacity-50
                        sm:static absolute bottom-5 right-5'
                >
                    {commenting ? 'Sending' : 'Send'}
                </button>
            </form>
        </div>
    )
}

export default AddComment