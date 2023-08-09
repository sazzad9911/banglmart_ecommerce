const initialState=false;
const isLoading=(state=initialState,action)=>{
    if(action.type==="SET_LOADING"){
        return action.playload;
    }
    return state
}
export default isLoading

export const setLoading=(value)=>{
    return{
        type:"SET_LOADING",
        playload:value
    }
}