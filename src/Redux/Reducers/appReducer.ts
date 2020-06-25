//Imports
import { getAuthUserData } from "./authReducer";
//Actions
const SetInitialized = 'SetInitialized';
//Action Creators
type setInitializedActionType = {
    type: typeof SetInitialized
}
export const setInitializedAC = ():setInitializedActionType => ({ type: SetInitialized });

//Initial state
type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false,
};
//Reducer
const appReducer = (state= initialState, action: any):InitialStateType => {
    switch (action.type) {
        case SetInitialized:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

//Thunks
export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
        .then(() => {
            dispatch(setInitializedAC());
        });
}

//Export
export default appReducer;