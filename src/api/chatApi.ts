const subscribers = {
  "recieved-message": [] as RecievedMessagesSubscriberType[],
  "changed-status": [] as ChangedStatusSubscriberType[],
};
let ws: WebSocket | null = null;
type eventNameType = "recieved-message" | "changed-status";

const closeHandler = () => {
  NotifySubscribers_Stauts("pending");
  setTimeout(createChanel, 3000);
};
const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribers["recieved-message"].forEach((s) => s(newMessages));
};
const openHandler = () => {
  NotifySubscribers_Stauts("ready");
};
const errorHandler = () => {
  NotifySubscribers_Stauts("error");
  console.error("Some Error occured , please refresh the page");
};

const cleanUp = () => {
  ws?.removeEventListener("close", createChanel);
  ws?.removeEventListener("message", messageHandler);
  ws?.removeEventListener("open", openHandler);
  ws?.removeEventListener("error", errorHandler);
};

const NotifySubscribers_Stauts = (status: StatusType) => {
  subscribers["changed-status"].forEach((s) => s(status));
};

function createChanel() {
  cleanUp();
  ws?.close();

  ws = new WebSocket(
    "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
  );
  NotifySubscribers_Stauts("pending");
  ws?.addEventListener("close", closeHandler);
  ws?.addEventListener("message", messageHandler);
  ws?.addEventListener("open", openHandler);
  ws?.addEventListener("error", errorHandler);
}

export const chatApi = {
  start() {
    createChanel();
  },
  stop() {
    subscribers["recieved-message"] = [];
    subscribers["changed-status"] = [];
    cleanUp();
    ws?.close();
  },
  subscribe(
    eventName: eventNameType,
    callback: RecievedMessagesSubscriberType | ChangedStatusSubscriberType
  ) {
    // @ts-ignore
    subscribers[eventName].push(callback);
    return () => {
      // @ts-ignore
      subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback);
    };
  },

  unsubscribe(
    eventName: eventNameType,
    callback: RecievedMessagesSubscriberType | ChangedStatusSubscriberType
  ) {
    // @ts-ignore
    subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback);
  },
  sendMessage(message: string) {
    ws?.send(message);
  },
};
type RecievedMessagesSubscriberType = (messages: ChatMessageAPIType[]) => void;
type ChangedStatusSubscriberType = (status: StatusType) => void;

export type ChatMessageAPIType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

export type StatusType = "pending" | "ready" | "error";
