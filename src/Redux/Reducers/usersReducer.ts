//Imports
import { userAPI } from "../../api/userAPI"
import { updateObjectInArray } from "../../Components/Common/utils/object-helper"
import { UserType } from './../../types/types'
import { InferActionstypes, BaseThunkType } from './../reduxStore'
import { Dispatch } from "redux"

//ActionCreators
export const actions = {
    followSuccessAC: (userId: number) =>
        ({ type: 'FOLLOW', userId } as const),
    unfollowSuccessAC: (userId: number) =>
        ({ type: 'UNFOLLOW', userId } as const),
    setUsersAC: (users: Array<UserType>) =>
        ({ type: 'SET_USERS', users } as const),
    setCurrentPageAC: (currentPage: number) =>
        ({ type: 'SET_CURRENT_PAGE', currentPage: currentPage } as const),
    setTotalUsersCountAC: (totalUsersCount: number) =>
        ({ type: 'SET_TOTAL_COUNT', count: totalUsersCount } as const),
    toggleIsFetchingAC: (isFetching: boolean) =>
        ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingProgressAC: (isFetching: boolean, userId: number) =>
        ({ type: 'Toggle_Is_FOLLOWING', isFetching, userId } as const),
}

type ActionsTypes = InferActionstypes<typeof actions>
//Initial State

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 12,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>//Array of users ids
}

type InitialStateType = typeof initialState

//Reducer
const UsersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
            }
        case "UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
            }
        case "SET_USERS":
            return { ...state, users: action.users }
        case "SET_CURRENT_PAGE":
            return { ...state, currentPage: action.currentPage }
        case "SET_TOTAL_COUNT":
            return { ...state, totalUsersCount: action.count }
        case "TOGGLE_IS_FETCHING":
            return { ...state, isFetching: action.isFetching }
        case "Toggle_Is_FOLLOWING":
            return {
                ...state,
                followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userId]
                    :
                    state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}


//Thunks
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = BaseThunkType<ActionsTypes>
//Users
export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetchingAC(true))
        dispatch(actions.setCurrentPageAC(page))
        let data = await userAPI.getUsers(page, pageSize)
        dispatch(actions.toggleIsFetchingAC(false))
        dispatch(actions.setUsersAC(data.items))
        dispatch(actions.setTotalUsersCountAC(data.totalCount))
    }
}


const _toggleFollowUnfollow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator:
    (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingProgressAC(true, userId))
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) { dispatch(actionCreator(userId)) }
    dispatch(actions.toggleFollowingProgressAC(false, userId))
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _toggleFollowUnfollow(dispatch, userId, userAPI.follow.bind(userId), actions.followSuccessAC)
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _toggleFollowUnfollow(dispatch, userId, userAPI.unfollow.bind(userId), actions.unfollowSuccessAC)
    }
}

//Export
export default UsersReducer;