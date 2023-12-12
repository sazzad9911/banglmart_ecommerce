const change=(state=null,action)=>{
    switch(action.type){
        case 'CHANGE_VALUE':
            return action.value;
        default:
            return state;
    }
}
export default change;
export const setChange=(value)=>{
    return {
        type:'CHANGE_VALUE',
        value
    }
}