import classNames from "classnames";

import { IWindow } from "./interface";
import classes from "./windowChat.module.css";
export default function Window(props: IWindow) {
  return (
    <>
      <div>
        <h4>Logged In User: {props.loggedInUser}</h4>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {props.messages.map((text) => (
            <div
              key={text.id}
              className={classNames(
                classes.chat,
                props.loggedInUser === text.sender && classes.chatBoxLeft
              )}
            >
              {text.message}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
