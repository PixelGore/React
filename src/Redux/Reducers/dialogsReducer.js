const addMessage = 'ADD-MESSAGE';

//Initial State
let initialState = {
    messages: [
        { id: 1, message: 'Du vet hvem er jeg ?' },
        { id: 2, message: 'Jeg er Ivar den benløse !' },
        { id: 3, message: 'Du kan ikke drepe meg !' },
    ],
    dialogs: [
        { id: 1, name: "Jeg" },
        { id: 2, name: "Deg" },
        { id: 3, name: "Ham" },
        { id: 4, name: "Henne" },
        { id: 5, name: "Det" },
        { id: 6, name: "Oss" },
        { id: 7, name: "Dere" },
        { id: 8, name: "Dem" },
    ],
};
//Reducer
const dialogsReducer = (state = initialState, action) => {


    switch (action.type) {
        case addMessage: {
            let body = action.newMessagesText
            return {
                ...state,
                messages: [...state.messages, { id: 6, message: body }]
            }
        }
        default:
            return state;
    }
}
//Action Creator
export const sendMessageActionCreator = (newMessagesText) => ({ type: 'ADD-MESSAGE', newMessagesText });


//end.
export default dialogsReducer;