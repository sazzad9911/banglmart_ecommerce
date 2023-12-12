const category=(state=null,action)=>{
    if(action.type==="SET_CATEGORY"){
        return action.value
    }
    return state
}
export default category;
export const setCategory=(value)=>{
    return{
        type:"SET_CATEGORY",
        value:value
    }
}