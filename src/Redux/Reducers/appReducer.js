import { getAuthUserData } from "./authReducer";

const SetInitialized = 'SetInitialized';

//Initial state
let initialState = {
    initialized: false,
};
//Reducer
const appReducer = (state = initialState, action) => {
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

//Action Creators
export const setInitializedAC = () => ({ type: SetInitialized });

//Thunks
export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
        .then(() => {
            dispatch(setInitializedAC());
        });
}

//end.
export default appReducer;