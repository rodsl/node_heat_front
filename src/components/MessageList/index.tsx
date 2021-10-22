import styles from "./styles.module.scss";

import logoImg from "../../assets/logo.svg";
import { api } from "../../services/api";
import { useEffect, useState } from "react";
import io from "socket.io-client";
type Message = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  };
};

const messagesQueue: Message[] = [];

const socket = io("http://localhost:4000");

socket.on("new_message", (newMessage) => {
  messagesQueue.push(newMessage);
});

export function MessageList() {
  const [messages, setMesssages] = useState<Message[]>([]);
  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setMesssages(prevState =>[messagesQueue[0], prevState[0], prevState[1]].filter(Boolean));
        messagesQueue.shift()
      }
    }, 3000);
  }, []);
  useEffect(() => {
    api.get<Message[]>("messages/last3").then((res) => {
      setMesssages(res.data);
    });
  }, []);
  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DoWhile 2021" />

      <ul className={styles.messageList}>
        {messages &&
          messages.map((message) => (
            <li key={message.id} className={styles.message}>
              <p className={styles.messageContent}>{message.text}</p>
              <div className={styles.messageUser}>
                <div className={styles.userImage}>
                  <img src={message.user.avatar_url} alt={message.user.name} />
                </div>
                <span>{message.user.name}</span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
