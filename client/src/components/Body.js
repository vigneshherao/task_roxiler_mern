import React from 'react'
import Table from './Table'

const Body = () => {
  return (
    <div className='w-[100%] md:w-[80%]'>
        <div className='w-32 h-32 bg-slate-100 rounded-full flex items-center m-auto'>
            <h4 className='text-center font-bold text-gray-700'>Transaction Dashboard</h4>
        </div>
        <Table/>
    </div>
  )
}

export default Body