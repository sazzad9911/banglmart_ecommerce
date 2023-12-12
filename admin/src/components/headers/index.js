import React from 'react'
import {IoIosArrowBack} from "react-icons/io"

export default function Header({title,onClick}) {
  return (
    <div className='my-4 flex justify-between'>
        <IoIosArrowBack onClick={onClick} size={30}/>
        <div className='headLine'>
            {title}
        </div>
        <div className='w-5'/>
    </div>
  )
}
