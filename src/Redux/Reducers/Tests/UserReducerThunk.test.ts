//Imports
import { follow, actions, unfollow } from "../usersReducer"
import { userAPI } from "../../../api/userAPI"
import { APIResponseType, ResultCodesEnum } from "../../../api/api"

//Creating fake userAPI & fake response
jest.mock('../../../api/userAPI')
const result: APIResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}
const userAPIMock = userAPI as jest.Mocked<typeof userAPI>
userAPIMock.follow.mockReturnValue(Promise.resolve(result))
userAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

//Creating fake dispatch & getState
const dispatchMock = jest.fn()
const getStateMock = jest.fn()


//BeforeEach test
beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    userAPIMock.follow.mockClear()
    userAPIMock.unfollow.mockClear()
})

//Follow Thunk
test('success follow thunk', async () => {
    const thunk = follow(1)

    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgressAC(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccessAC(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgressAC(false, 1))
})

//Unfollow Thunk
test('success unfollow thunk', async () => {
    const thunk = unfollow(1)

    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgressAC(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccessAC(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgressAC(false, 1))
})