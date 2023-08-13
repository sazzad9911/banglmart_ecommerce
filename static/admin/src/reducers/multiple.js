export const size=(state=null,action)=>{
    if(action.type==="SIZE"){
        return action.value
    }
    return state
}
export const setSize=(value)=>{
    return{
        type:"SIZE",
        value:value
    }
}

export const color=(state=null,action)=>{
    if(action.type==="COLOR"){
        return action.value
    }
    return state
}
export const setColor=(value)=>{
    return{
        type:"COLOR",
        value:value
    }
}
export const variant=(state=null,action)=>{
    if(action.type==="VARIANT"){
        return action.value
    }
    return state
}
export const setVariant=(value)=>{
    return{
        type:"VARIANT",
        value:value
    }
}
export const flashSell=(state=null,action)=>{
    if(action.type==="FLASH_SELL"){
        return action.value
    }
    return state
}
export const setFlashSell=(value)=>{
    return{
        type:"FLASH_SELL",
        value:value
    }
}
