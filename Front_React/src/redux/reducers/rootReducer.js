import {combineReducers} from 'redux'
import homepageReducer from "./homepageReducer";
import navbarReducer from "./navbarReducer";
import searchReducer from "./searchReducer";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";

const rootReducer = combineReducers({
    homepage: homepageReducer,
    navbar: navbarReducer,
    search: searchReducer,
    auth: authReducer,
    alerts: alertReducer,
});

export default rootReducer