import category from "reducers/category";
import isLoading from "reducers/isLoading";
import { size } from "reducers/multiple";
import { variant } from "reducers/multiple";
import { color } from "reducers/multiple";
import option from "reducers/option";
import product from "reducers/product";
import subCategory from "reducers/sub-category";
import user from "reducers/user";

const { combineReducers, createStore } = require("redux");


const combine=combineReducers({
    user:user,
    isLoading:isLoading,
    option:option,
    subCategory:subCategory,
    category:category,
    product:product,
    color:color,
    size:size,
    variant:variant
})
const store =createStore(combine)
export default store