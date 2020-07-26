import profileReducer, { actions } from "../profileReducer";

let state = {
    posts: [
        { id: 1, message: "Hi , ur mom gay !", upvotes: 69, downvotes: 99 },
        { id: 2, message: "No , u !", upvotes: 420, downvotes: 23 },
    ],
    profile: null,
    status: "",
}

it('New post should be added', () => {
    // 1. Test data
    let action = actions.addPostAC('newPost')

    // 2. Action
    let newState = profileReducer(state, action)

    // 3. Expectation
    expect(newState.posts.length).toBe(3)
});

it('New post text shoul be == newPost', () => {
    // 1. Test data
    let action = actions.addPostAC('newPost')

    // 2. Action
    let newState = profileReducer(state, action)

    // 3. Expectation
    expect(newState.posts[2].message).toBe('newPost')
});

it('The lenght of posts should decrement', () => {
    // 1. Test data
    let action = actions.deletePostAC(3)

    // 2. Action
    let newState = profileReducer(state, action)

    // 3. Expectation
    expect(newState.posts.length).toBe(2)
});

it(`After deleting post , length shouldn't  decrement if id is incorrect`, () => {
    // 1. test data
    let action = actions.deletePostAC(1000);

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(2);
});