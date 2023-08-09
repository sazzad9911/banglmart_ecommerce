const initialState=null

const product=(state=initialState,action)=>{
    if(action.type==="SET_PRODUCT"){
        return action.playload
    }
    return state
}
export default product;
export const setProduct=(value)=>{
    return{
        type:"SET_PRODUCT",
        playload:value
    }
}