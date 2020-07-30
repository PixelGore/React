//Imports
import { userAPI } from "../../api/userAPI"
import { updateObjectInArray } from "../../Components/Common/utils/object-helper"
import { UserType } from './../../types/types'
import { InferActionstypes, BaseThunkType } from './../reduxStore'
import { Dispatch } from "redux"
import { APIResponseType } from "../../api/api"

//ActionCreators
export const actions = {
    followSuccessAC: (userId: number) =>
        ({ type: 'usersPage/FOLLOW', userId } as const),
    unfollowSuccessAC: (userId: number) =>
        ({ type: 'usersPage/UNFOLLOW', userId } as const),
    setUsersAC: (users: Array<UserType>) =>
        ({ type: 'usersPage/SET_USERS', users } as const),
    setCurrentPageAC: (currentPage: number) =>
        ({ type: 'usersPage/SET_CURRENT_PAGE', currentPage: currentPage } as const),
    setFilterAC: (filter: FilterType) =>
        ({ type: 'usersPage/SET_FILTER', payload: filter } as const),
    setTotalUsersCountAC: (totalUsersCount: number) =>
        ({ type: 'usersPage/SET_TOTAL_COUNT', count: totalUsersCount } as const),
    toggleIsFetchingAC: (isFetching: boolean) =>
        ({ type: 'usersPage/TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingProgressAC: (isFetching: boolean, userId: number) =>
        ({ type: 'usersPage/Toggle_Is_FOLLOWING', isFetching, userId } as const),
}

type ActionsTypes = InferActionstypes<typeof actions>
//Initial State

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 12,
    totalUsersCount: 0,
    currentPage: 1,
    filter: {
        term: '',
        friend: null as null | boolean
    },
    isFetching: true,
    followingInProgress: [] as Array<number>//Array of users ids
}

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter

//Reducer
const UsersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "usersPage/FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
            }
        case "usersPage/UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
            }
        case "usersPage/SET_USERS":
            return { ...state, users: action.users }
        case "usersPage/SET_CURRENT_PAGE":
            return { ...state, currentPage: action.currentPage }
        case "usersPage/SET_FILTER":
            return { ...state, filter: action.payload }
        case "usersPage/SET_TOTAL_COUNT":
            return { ...state, totalUsersCount: action.count }
        case "usersPage/TOGGLE_IS_FETCHING":
            return { ...state, isFetching: action.isFetching }
        case "usersPage/Toggle_Is_FOLLOWING":
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
export const requestUsers = (page: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetchingAC(true))
        dispatch(actions.setCurrentPageAC(page))
        dispatch(actions.setFilterAC(filter))
        let data = await userAPI.getUsers(page, pageSize, filter.term, filter.friend)
        dispatch(actions.toggleIsFetchingAC(false))
        dispatch(actions.setUsersAC(data.items))
        dispatch(actions.setTotalUsersCountAC(data.totalCount))
    }
}


const _toggleFollowUnfollow = async (dispatch: DispatchType, userId: number, apiMethod: (userId: number) => Promise<APIResponseType>, actionCreator:
    (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingProgressAC(true, userId))
    let response = await apiMethod(userId)
    if (response.resultCode === 0) { dispatch(actionCreator(userId)) }
    dispatch(actions.toggleFollowingProgressAC(false, userId))
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _toggleFollowUnfollow(dispatch, userId, userAPI.follow.bind(userAPI), actions.followSuccessAC)
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _toggleFollowUnfollow(dispatch, userId, userAPI.unfollow.bind(userAPI), actions.unfollowSuccessAC)
    }
}

//Export
export default UsersReducer;