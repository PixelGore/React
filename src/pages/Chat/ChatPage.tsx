import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatMessageType } from "../../api/chatApi";
import {
    sendMessage,
  startGetMessages,
  stopGetMessages,
} from "../../Redux/Reducers/chatReducer";
import { AppStateType } from "../../Redux/reduxStore";

const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

const Chat: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGetMessages());
    return () => {
      dispatch(stopGetMessages());
    };
  }, [dispatch]);

  return (
    <div>
      <Messages />
      <AddMessageFom />
    </div>
  );
};

const Messages: React.FC<{}> = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages);

  return (
    <div style={{ height: "400px", overflowY: "auto" }}>
      {messages.map((m, index) => (
        <Message key={index} message={m} />
      ))}
    </div>
  );
};

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
  return (
    <div>
      <img src={message.photo} height="50" alt="MessageUserImage" />{" "}
      <b>{message.userName}</b>
      <br />
      {message.message}
      <hr />
    </div>
  );
};

const AddMessageFom: React.FC<{}> = () => {
  const [message, setMessage] = useState("");
  const [isReadyStatus, setIsReadyStatus] = useState<"pending" | "ready">(
    "pending"
  );

  const dispatch = useDispatch();
  

  const sendMessageHandler = () => {
    if (!message) {
      return;
    }
    dispatch(sendMessage(message));
    setMessage("");
  };
  return (
    <div>
      <div>
        <textarea
          onChange={(e) => setMessage(e.currentTarget.value)}
          value={message}
        ></textarea>
      </div>
      <div>
        <button
          disabled={false}
          onClick={sendMessageHandler}
        >
          Send
        </button>
      </div>
    </div>
  );
};
export default ChatPage;
