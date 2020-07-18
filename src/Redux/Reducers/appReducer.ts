//Imports
import { getAuthUserData } from "./authReducer"
import { InferActionstypes } from "../reduxStore"


//Actions
const actions = {
 setInitializedAC: () => ({ type: 'app/Set_Initialized' } as const)
}
type ActionsTypes = InferActionstypes<typeof actions>


//Initial state
let initialState = {
    initialized: false,
}
type InitialStateType = typeof initialState


//Reducer
const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'app/Set_Initialized':
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
            dispatch(actions.setInitializedAC())
        });
}


//Export
export default appReducer;