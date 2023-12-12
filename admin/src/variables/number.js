export const getNumber=(number)=>{
    let num=parseInt(number);
    if(num<1000){
        return `${num}`
    }
    return `${(number/1000).toFixed(2)}K`
}