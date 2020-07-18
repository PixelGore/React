//Imports
import { createStore, combineReducers, applyMiddleware, compose, Action } from "redux"
import profileReducer from "./Reducers/profileReducer"
import dialogsReducer from "./Reducers/dialogsReducer"
import sidebarReducer from "./Reducers/sidebarReducer"
import UsersReducer from "./Reducers/usersReducer"
import authReducer from "./Reducers/authReducer"
import thunkMiddleware, { ThunkAction } from "redux-thunk"
import { reducer as formReducer } from 'redux-form'
import appReducer from "./Reducers/appReducer"

//RootReducer
let RootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: UsersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})
export type AppStateType = ReturnType<typeof RootReducer>

//ActionTypes
export type InferActionstypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

//ThunkTypes
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(RootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))
// @ts-ignore
window.__store__ = store

export default store;