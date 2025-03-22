import React from 'react'

const ErrorPage = ({error}:{error: string}) => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <h1 className='text-2xl text-red-500'>{error}</h1>
    </div>
  )
}

export default ErrorPage