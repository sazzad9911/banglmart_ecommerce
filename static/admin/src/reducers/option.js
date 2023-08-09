const option=(state=null,action)=>{
    if(action.type==="SET_OPTION"){
        return action.value
    }
    return state
}
export default option;
export const setOption=(value)=>{
    return{
        type:"SET_OPTION",
        value:value
    }
}