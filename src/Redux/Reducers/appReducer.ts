//Imports
import { getAuthUserData } from "./authReducer"
//Actions
const SetInitialized = 'SetInitialized'
//Action Creators
export const setInitializedAC = (): setInitializedActionType => ({ type: SetInitialized });
type setInitializedActionType = {
    type: typeof SetInitialized
}

type ActionsTypes = setInitializedActionType
//Initial state
let initialState: InitialStateType = {
    initialized: false,
}
type InitialStateType = {
    initialized: boolean
}
//Reducer
const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SetInitialized:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

//Thunks
export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(setInitializedAC())
        });
}

//Export
export default appReducer;