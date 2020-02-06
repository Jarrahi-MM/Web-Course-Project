import {combineReducers} from 'redux'
import homepageReducer from "./homepageReducer";
import navbarReducer from "./navbarReducer";
import searchReducer from "./searchReducer";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import postReducer from  "./postReducer"
import modalReducer from "./modalReducer";

const rootReducer = combineReducers({
    homepage: homepageReducer,
    navbar: navbarReducer,
    search: searchReducer,
    auth: authReducer,
    alerts: alertReducer,
    posts: postReducer,
    modal: modalReducer,
});

export default rootReducer