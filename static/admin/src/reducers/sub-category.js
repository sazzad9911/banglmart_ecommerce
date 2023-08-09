const subCategory=(state=null,action)=>{
    if(action.type==="SET_SUBCATEGORY"){
        return action.value
    }
    return state
}
export default subCategory;
export const setSubCategory=(value)=>{
    return{
        type:"SET_SUBCATEGORY",
        value:value
    }
}