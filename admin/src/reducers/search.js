const initialState=null;
const  search=(state=initialState,action)=>{
    if(action.type==="SET_SEARCH"){
        return action.value;
    }
    return state
}
export default search
export const storeSearch=(value)=>{
    return{
        type: "SET_SEARCH",
        value:value
    }
}