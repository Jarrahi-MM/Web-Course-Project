import {combineReducers} from 'redux'
import homepageReducer from "./homepageReducer";
import navbarReducer from "./navbarReducer";
import searchReducer from "./searchReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
    homepage: homepageReducer,
    navbar: navbarReducer,
    search: searchReducer,
    auth: authReducer,
});

export default rootReducer