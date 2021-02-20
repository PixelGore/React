import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatMessageAPIType } from "../../api/chatApi";
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

  const status = useSelector((state: AppStateType) => state.chat.status);

  useEffect(() => {
    dispatch(startGetMessages());
    return () => {
      dispatch(stopGetMessages());
    };
  }, [dispatch]);

  return (
    <>
      {status === "error" && (
        <div>Some Error occured , please refresh the page</div>
      )}
      <>
        <Messages />
        <AddMessageFom />
      </>
    </>
  );
};

const Messages: React.FC<{}> = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages);
  const messagesAnchorRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget;
    if (
      Math.abs(
        element.scrollHeight - element.scrollTop - element.clientHeight
      ) < 300
    ) {
      !isAutoScroll && setIsAutoScroll(true);
    } else {
      isAutoScroll && setIsAutoScroll(false);
    }
  };
  useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div
      style={{ height: "400px", overflowY: "auto" }}
      onScroll={scrollHandler}
    >
      {messages.map((m, index) => (
        <Message key={m.id} message={m} />
      ))}
      <div ref={messagesAnchorRef}></div>
    </div>
  );
};

const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(
  ({ message }) => {
    return (
      <div>
        <img src={message.photo} height="50" alt="MessageUserImage" />{" "}
        <b>{message.userName}</b>
        <br />
        {message.message}
        <hr />
      </div>
    );
  }
);

const AddMessageFom: React.FC<{}> = () => {
  const [message, setMessage] = useState("");
  const status = useSelector((state: AppStateType) => state.chat.status);

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
        <button disabled={status !== "ready"} onClick={sendMessageHandler}>
          Send
        </button>
      </div>
    </div>
  );
};
export default ChatPage;
