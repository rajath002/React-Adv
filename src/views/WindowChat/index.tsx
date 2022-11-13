import classes from "./windowChat.module.css";
import Window from "./Window";
import useChatStore from "./hooks/chatStore";
import Textbox from "./components/Textbox";
import classNames from "classnames";
import { useState } from "react";
import Login from "./components/Login";

export default function WindowChat() {
  const { state, sendMessage, getMessageCount } = useChatStore();

  const [loginUser1, setLoginUser1] = useState<string>("");
  const [loginUser2, setLoginUser2] = useState<string>("");

  const onSubmitChat = (text: { message: string; loggedInUser: string }) => {
    console.log(text.message);
    sendMessage({
      id: getMessageCount().toString(),
      message: text.message,
      sender: text.loggedInUser,
    });
  };

  const loginWindow1 = (username: string): string => {
    if (username === loginUser2) {
      return "Duplicate user! please re-enter username";
    }
    setLoginUser1(username);
    return "";
  };

  const loginWindow2 = (username: string): string => {
    if (username === loginUser1) {
      return "Duplicate user! please re-enter username";
    }
    setLoginUser2(username);
    return "";
  };

  return (
    <>
      <div className={classes.header}>Window Chat</div>
      <div className={classes.container}>
        <div>
          <div className={classNames(classes.window, classes.window_1)}>
            {loginUser1 ? (
              <Window loggedInUser={loginUser1} messages={state} />
            ) : (
              <Login windowName="window1" onLogin={loginWindow1} />
            )}
          </div>
          <Textbox onSubmit={onSubmitChat} loggedInUser={loginUser1} />
        </div>
        <div>
          <div className={classNames(classes.window, classes.window_2)}>
            {loginUser2 ? (
              <Window loggedInUser={loginUser2} messages={state} />
            ) : (
              <Login windowName="window2" onLogin={loginWindow2} />
            )}
          </div>
          <Textbox onSubmit={onSubmitChat} loggedInUser={loginUser2} />
        </div>
      </div>
    </>
  );
}
