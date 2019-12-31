import {combineReducers} from 'redux'
import homepageReducer from "./homepageReducer";
import navbarReducer from "./navbarReducer";

const rootReducer = combineReducers({
    homePage: homepageReducer,
    navbar: navbarReducer
});

export default rootReducer