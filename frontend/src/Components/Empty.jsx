import React from 'react'

function Empty() {
  return (
    <div className='w-[100vw] h-[100%] flex flex-col items-center justify-center mt-10'>
        <img src="https://i.ibb.co/nMWRh0V8/empty.png" className='w-[40%] md:w-[20%] mt-10' />
        <h1 className='text-2xl font-semibold'>No such task available</h1>
    </div>
  )
}

export default Empty