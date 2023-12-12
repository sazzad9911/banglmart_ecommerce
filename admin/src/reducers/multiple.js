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
export const allUser=(state=null,action)=>{
    if(action.type==="ALL_USER"){
        return action.value
    }
    return state
}
export const setAllUser=(value)=>{
    return{
        type:"ALL_USER",
        value:value
    }
}
export const allBrand=(state=null,action)=>{
    if(action.type==="ALL_BRAND"){
        return action.value
    }
    return state
}
export const setAllBrand=(value)=>{
    return{
        type:"ALL_BRAND",
        value:value
    }
}
export const allShop=(state=null,action)=>{
    if(action.type==="ALL_SHOP"){
        return action.value
    }
    return state
}
export const setAllShop=(value)=>{
    return{
        type:"ALL_SHOP",
        value:value
    }
}
export const allAds=(state=null,action)=>{
    if(action.type==="ALL_ADS"){
        return action.value
    }
    return state
}
export const setAllAds=(value)=>{
    return{
        type:"ALL_ADS",
        value:value
    }
}
export const allSlider=(state=null,action)=>{
    if(action.type==="ALL_SLIDER"){
        return action.value
    }
    return state
}
export const setAllSlider=(value)=>{
    return{
        type:"ALL_SLIDER",
        value:value
    }
}
export const allBanner=(state=null,action)=>{
    if(action.type==="ALL_BANNER"){
        return action.value
    }
    return state
}
export const setAllBanner=(value)=>{
    return{
        type:"ALL_BANNER",
        value:value
    }
}
export const allComments=(state=null,action)=>{
    if(action.type==="ALL_COMMENTS"){
        return action.value
    }
    return state
}
export const setAllComments=(value)=>{
    return{
        type:"ALL_COMMENTS",
        value:value
    }
}
export const allConversation=(state=null,action)=>{
    if(action.type==="ALL_CONVERSATION"){
        return action.value
    }
    return state
}
export const setAllConversation=(value)=>{
    return{
        type:"ALL_CONVERSATION",
        value:value
    }
}