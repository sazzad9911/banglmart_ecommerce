import { Button } from '@chakra-ui/react'
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

export default function FloatButton({onClick,className}) {
  return (
    <div className={`fixed bottom-10 right-10 z-50 rounded-full shadow-lg ${className}`}>
        <Button onClick={onClick} style={{
            backgroundColor:"#0083A9",
            borderRadius:30,
            height:60,
            width:60,
        }}>
            <AiOutlinePlus color='white' size={30}/>
        </Button>
    </div>
  )
}
