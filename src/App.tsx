import { useContext, useState } from "react";
import styles from "./App.module.scss";
import { MessageList } from "./components/MessageList/index";
import { LoginBox } from "./components/LoginBox/index";
import { AuthContext } from "./context/auth";
import { SendMessageForm } from "./components/SendMessageForm";

export function App() {
  const { user } = useContext(AuthContext);
  return (
    <main className={`${styles.contentWrapper} ${!!user && styles.contentSigned}`}>
      <MessageList />
      {!!user ? <SendMessageForm /> : <LoginBox />}
    </main>
  );
}
