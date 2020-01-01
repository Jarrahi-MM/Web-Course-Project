import {combineReducers} from 'redux'
import homepageReducer from "./homepageReducer";
import navbarReducer from "./navbarReducer";
import searchReducer from "./searchReducer";

const rootReducer = combineReducers({
    homePage: homepageReducer,
    navbar: navbarReducer,
    search: searchReducer,
});

export default rootReducer