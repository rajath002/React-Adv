import classNames from "classnames";
import { FormEvent } from "react";

import classes from "./textbox.module.css";

interface ITextbox {
  onSubmit: (text: { message: string; loggedInUser: string }) => void;
  loggedInUser: string;
}

export default function Textbox(props: ITextbox) {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      message: { value: string };
      reset: () => void;
    };

    if(!target.message.value.trim()) return;
    
    props.onSubmit({
      message: target.message.value,
      loggedInUser: props.loggedInUser,
    });
    target.reset();
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className={classNames(classes.textbox_container)}>
          <input
            type="text"
            placeholder="Type Message"
            name="message"
            id="message"
            className={classes.textbox}
          />
          <button>Send</button>
        </div>
      </form>
    </>
  );
}
