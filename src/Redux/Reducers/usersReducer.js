//Imports
import { userAPI } from "../../api/api";
import { updateObjectInArray } from "../../utils/object-helper";

//Actions
const FOLLOW = 'follow';
const UNFOLLOW = 'unfollow';
const setUSERS = "setUsers";
const setCurrentPAGE = 'setCurrentPage';
const setTotalCOUNT = 'setTotalCount';
const toggleIsFETCHING = 'toggleIsFetching';
const toggleIsFOLLOWING = 'toggleIsFOLLOWING';
//ActionCreators
export const followSuccess = (userId) => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: setUSERS, users });
export const setCurrentPage = (currentPage) => ({ type: setCurrentPAGE, currentPage: currentPage });
export const setTotalUsersCount = (totalUsersCount) => ({ type: setTotalCOUNT, count: totalUsersCount });
export const toggleIsFetching = (isFetching) => ({ type: toggleIsFETCHING, isFetching })
export const toggleFollowingProgress = (isFetching, userId) => ({ type: toggleIsFOLLOWING, isFetching, userId })

//Initial State
let initialState = {
    users: [],
    pageSize: 12,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
};
//Reducer
const UsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case setUSERS:
            return { ...state, users: action.users }
        case setCurrentPAGE:
            return { ...state, currentPage: action.currentPage }
        case setTotalCOUNT:
            return { ...state, totalUsersCount: action.count }
        case toggleIsFETCHING:
            return { ...state, isFetching: action.isFetching }
        case toggleIsFOLLOWING:
            return {
                ...state,
                followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userId]
                    :
                    [state.followingInProgress.filter(id => id !== action.userId)]
            }
        default:
            return state;
    }
}


//Thunks
//Users
export const requestUsers = (page, pageSize) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));
        let data = await userAPI.getUsers(page, pageSize)
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
}


const toggleFollowUnfollow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) { dispatch(actionCreator(userId)) }
    dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId) => {
    return async (dispatch) => {
        toggleFollowUnfollow(dispatch, userId, userAPI.follow.bind(userId), followSuccess);
    }
}

export const unfollow = (userId) => {
    return async (dispatch) => {
        toggleFollowUnfollow(dispatch, userId, userAPI.unfollow.bind(userId), unfollowSuccess);
    }
}

//end.
export default UsersReducer;