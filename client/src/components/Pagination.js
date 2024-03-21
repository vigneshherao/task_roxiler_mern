import React from 'react'

const Pagination = () => {
  return (
    <div className='mt-2 flex justify-between'>
        <div>
            <p>Page no : 1</p>
        </div>
        <div className='cursor-pointer'>
            <span className='mr-10'>Next</span>
            <span>Previous</span>
        </div>
        <div>
            <p>Per Page:10</p>
        </div>
    </div>
  )
}

export default Pagination