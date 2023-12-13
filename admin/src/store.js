import category from "reducers/category";
import change from "reducers/change";
import isLoading from "reducers/isLoading";
import { size } from "reducers/multiple";
import { variant } from "reducers/multiple";
import { allBrand } from "reducers/multiple";
import { allSlider } from "reducers/multiple";
import { allBanner } from "reducers/multiple";
import { allConversation } from "reducers/multiple";
import { allComments } from "reducers/multiple";
import { allAds } from "reducers/multiple";
import { allShop } from "reducers/multiple";
import { allUser } from "reducers/multiple";
import { flashSell } from "reducers/multiple";
import { color } from "reducers/multiple";
import option from "reducers/option";
import product from "reducers/product";
import search from "reducers/search";
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
    variant:variant,
    flashSell:flashSell,
    change:change,
    allUser:allUser,
    allBrand:allBrand,
    allShop:allShop,
    allSlider:allSlider,
    allAds:allAds,
    allBanner:allBanner,
    allComment:allComments,
    allConversation:allConversation,
    search:search
})
const store =createStore(combine)
export default store