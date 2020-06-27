//Actions
const addMessage = 'ADD-MESSAGE';
//Action Creator
export const sendMessageAC = (newMessagesText: string): sendMessageActionCreatorACType => ({ type: 'ADD-MESSAGE', newMessagesText });
type sendMessageActionCreatorACType = {
    type: typeof addMessage
    newMessagesText: string
}
type ActionsTypes = sendMessageActionCreatorACType
//Initial State
type DialogType = {
    id: number
    name: string
}
type messageType = {
    id: number
    message: string
}

let initialState = {
    messages: [
        { id: 1, message: 'Du vet hvem er jeg ?' },
        { id: 2, message: 'Jeg er Ivar den benløse !' },
        { id: 3, message: 'Du kan ikke drepe meg !' },
    ] as Array<messageType>,
    dialogs: [
        { id: 1, name: "Jeg" },
        { id: 2, name: "Deg" },
        { id: 3, name: "Ham" },
        { id: 4, name: "Henne" },
        { id: 5, name: "Det" },
        { id: 6, name: "Oss" },
        { id: 7, name: "Dere" },
        { id: 8, name: "Dem" },
    ] as Array<DialogType>,
};
type initialStateType = typeof initialState
//Reducer
const dialogsReducer = (state = initialState, action: ActionsTypes): initialStateType => {


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

//Export
export default dialogsReducer;