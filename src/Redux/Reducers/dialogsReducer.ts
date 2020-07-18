//Imports
import { InferActionstypes } from "../reduxStore";


//Action Creator
export const actions = {
  sendMessageAC : (newMessagesText: string) => ({ type: 'messagesPage/sendMESSAGE', newMessagesText }as const),
}
type ActionsTypes = InferActionstypes<typeof actions>


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
        { id: 1, message: 'Hello' },
        { id: 2, message: 'Ça va ?' },
        { id: 3, message: 'Du vet hvem er jeg ?' },
    ] as Array<messageType>,
    dialogs: [
        { id: 1, name: "Alex" },
        { id: 2, name: "John" },
        { id: 3, name: "Alexa" },
        { id: 4, name: "Siri" },
        { id: 5, name: "Max" },
    ] as Array<DialogType>,
}
export type initialStateType = typeof initialState

//Reducer
const dialogsReducer = (state = initialState, action: ActionsTypes): initialStateType => {


    switch (action.type) {
        case 'messagesPage/sendMESSAGE': {
            let text = action.newMessagesText
            return {
                ...state,
                messages: [...state.messages, { id: 6, message: text }]
            }
        }
        default:
            return state;
    }
}

//Export
export default dialogsReducer;