import { Dispatch } from "redux";
import { chatApi, ChatMessageAPIType, StatusType } from "./../../api/chatApi";
import { FormAction } from "redux-form";
import { InferActionstypes, BaseThunkType } from "../reduxStore";
import { v1 } from "uuid";

type ChatMessageType = ChatMessageAPIType & { id: string };

//Initial state
let InitialState = {
  messages: [] as ChatMessageType[],
  status: "pending" as StatusType,
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
        messages: [
          ...state.messages,
          ...action.payload.messages.map((m) => ({ ...m, id: v1() })),
        ].filter((m, index, array) => index >= array.length - 100),
      };
    case "SN/chat/SET_STATUS":
      return {
        ...state,
        status: action.payload.status,
      };
    default:
      return state;
  }
};

//Actions
const actions = {
  recievedMessages: (messages: ChatMessageAPIType[]) =>
    ({
      type: "SN/chat/RECIEVED_MESSAGES",
      payload: { messages },
    } as const),
  SET_STATUS: (status: StatusType) =>
    ({
      type: "SN/chat/SET_STATUS",
      payload: { status },
    } as const),
};

//Thunks

// RecieveMessages
let _newMessageHandler:
  | ((messages: ChatMessageAPIType[]) => void)
  | null = null;
const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actions.recievedMessages(messages));
    };
  }
  return _newMessageHandler;
};
// SetStatus
let _changedStatusHandler: ((status: StatusType) => void) | null = null;
const _changedStatusHandlerCreator = (dispatch: Dispatch) => {
  if (_changedStatusHandler === null) {
    _changedStatusHandler = (status) => {
      dispatch(actions.SET_STATUS(status));
    };
  }
  return _changedStatusHandler;
};

export const startGetMessages = (): ThunkType => async (dispatch) => {
  chatApi.start();
  chatApi.subscribe("recieved-message", newMessageHandlerCreator(dispatch));
  chatApi.subscribe("changed-status", _changedStatusHandlerCreator(dispatch));
};
export const stopGetMessages = (): ThunkType => async (dispatch) => {
  chatApi.unsubscribe("recieved-message", newMessageHandlerCreator(dispatch));
  chatApi.subscribe("changed-status", _changedStatusHandlerCreator(dispatch));
  chatApi.stop();
};
export const sendMessage = (message: string): ThunkType => async (dispatch) => {
  chatApi.sendMessage(message);
};

//Export
export default ChatReducer;
type ActionsTypes = InferActionstypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes | FormAction>;
