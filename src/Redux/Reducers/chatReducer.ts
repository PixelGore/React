import { Dispatch } from "redux";
import { chatApi, ChatMessageType } from "./../../api/chatApi";
import { FormAction } from "redux-form";
import { InferActionstypes, BaseThunkType } from "../reduxStore";

//Initial state
let InitialState = {
  messages: [] as ChatMessageType[],
};
type initialStateType = typeof InitialState;

//Reducer
const ChatReducer = (
  state = InitialState,
  action: ActionsTypes
): initialStateType => {
  switch (action.type) {
    case "SN/chat/RECIEVED_MESSAGES":
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages],
      };
    default:
      return state;
  }
};

//Actions
const actions = {
  recievedMessages: (messages: ChatMessageType[]) =>
    ({
      type: "SN/chat/RECIEVED_MESSAGES",
      payload: { messages },
    } as const),
};

//Thunks
let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;
const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actions.recievedMessages(messages));
    };
  }
  return _newMessageHandler;
};

export const startGetMessages = (): ThunkType => async (dispatch) => {
  chatApi.start();
  chatApi.subscribe(newMessageHandlerCreator(dispatch));
};
export const stopGetMessages = (): ThunkType => async (dispatch) => {
  chatApi.unsubscribe(newMessageHandlerCreator(dispatch));
  chatApi.stop();
};
export const sendMessage = (message: string): ThunkType => async (dispatch) => {
  chatApi.sendMessage(message);
};
//Export
export default ChatReducer;
type ActionsTypes = InferActionstypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes | FormAction>;
