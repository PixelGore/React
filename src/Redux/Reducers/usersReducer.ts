//Imports
import { userAPI } from "../../api/api";
import { updateObjectInArray } from "../../utils/object-helper";
import { UserType } from './../../types/types';
//Actions
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const toggleIsFOLLOWING = 'toggleIsFOLLOWING';
//ActionCreators
export const followSuccessAC = (userId:number):followSuccessACType => ({ type: FOLLOW, userId });
type followSuccessACType = {
    type: typeof FOLLOW
    userId:number
}
export const unfollowSuccessAC = (userId:number):unfollowSuccessACType => ({ type: UNFOLLOW, userId });
type unfollowSuccessACType = {
    type: typeof UNFOLLOW
    userId:number
}
export const setUsersAC = (users:Array<UserType>):setUsersACType => ({ type: SET_USERS, users });
type setUsersACType = {
    type: typeof SET_USERS
    users:Array<UserType>
}
export const setCurrentPageAC = (currentPage:number):setCurrentPageACType => ({ type: SET_CURRENT_PAGE, currentPage: currentPage });
type setCurrentPageACType = {
    type: typeof SET_CURRENT_PAGE
    currentPage:number
}
export const setTotalUsersCountAC = (totalUsersCount:number):setTotalUsersCountACType => ({ type: SET_TOTAL_COUNT, count: totalUsersCount });
type setTotalUsersCountACType = {
    type: typeof SET_TOTAL_COUNT
    count:number
    
}
export const toggleIsFetchingAC = (isFetching:boolean):toggleIsFetchingACType => ({ type: TOGGLE_IS_FETCHING, isFetching })
type toggleIsFetchingACType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching:boolean
}
export const toggleFollowingProgressAC = (isFetching:boolean, userId:number):toggleFollowingProgressACType => ({ type: toggleIsFOLLOWING, isFetching, userId })
type toggleFollowingProgressACType = {
    type: typeof toggleIsFOLLOWING
    isFetching:boolean
    userId:number
    
}
//Initial State
type InitialStateType = typeof initialState

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 12,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>//Array of users ids
};
//Reducer
const UsersReducer = (state = initialState, action:any):InitialStateType => {
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
        case SET_USERS:
            return { ...state, users: action.users }
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage }
        case SET_TOTAL_COUNT:
            return { ...state, totalUsersCount: action.count }
        case TOGGLE_IS_FETCHING:
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
export const requestUsers = (page:number, pageSize:number) => {
    return async (dispatch:any) => {
        dispatch(toggleIsFetchingAC(true));
        dispatch(setCurrentPageAC(page));
        let data = await userAPI.getUsers(page, pageSize)
        dispatch(toggleIsFetchingAC(false));
        dispatch(setUsersAC(data.items));
        dispatch(setTotalUsersCountAC(data.totalCount));
    }
}


const toggleFollowUnfollow = async (dispatch:any, userId:number, apiMethod:any, actionCreator:any) => {
    dispatch(toggleFollowingProgressAC(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) { dispatch(actionCreator(userId)) }
    dispatch(toggleFollowingProgressAC(false, userId));
}

export const follow = (userId:number) => {
    return async (dispatch:any) => {
        toggleFollowUnfollow(dispatch, userId, userAPI.follow.bind(userId), followSuccessAC);
    }
}

export const unfollow = (userId:number) => {
    return async (dispatch:any) => {
        toggleFollowUnfollow(dispatch, userId, userAPI.unfollow.bind(userId), unfollowSuccessAC);
    }
}

//Export
export default UsersReducer;