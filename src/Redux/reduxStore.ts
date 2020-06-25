import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import profileReducer from "./Reducers/profileReducer"
import dialogsReducer from "./Reducers/dialogsReducer"
import sidebarReducer from "./Reducers/sidebarReducer"
import UsersReducer from "./Reducers/usersReducer"
import authReducer from "./Reducers/authReducer"
import thunkMiddleware from "redux-thunk"
import { reducer as formReducer } from 'redux-form'
import appReducer from "./Reducers/appReducer"

let RootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: UsersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

type RootReducerType = typeof RootReducer
export type AppStateType = ReturnType<RootReducerType>


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(RootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))
// @ts-ignore
window.__store__ = store

export default store;