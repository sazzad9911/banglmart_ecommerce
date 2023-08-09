import { Button } from '@chakra-ui/react'
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

export default function FloatButton({onClick}) {
  return (
    <div className='fixed bottom-10 right-10'>
        <Button onClick={onClick} style={{
            backgroundColor:"#4318FF",
            borderRadius:30,
            height:60,
            width:60,
        }}>
            <AiOutlinePlus color='white' size={30}/>
        </Button>
    </div>
  )
}
