import classes from "./windowChat.module.css";
import WindowOne from "./components/WindowOne";
import WindowTwo from "./components/WindowTwo";

export default function WindowChat() {
  return (
    <>
      <div className={classes.header}>Window Chat</div>
      <div className={classes.container}>
        <div><WindowOne /></div>
        <div><WindowTwo /></div>
      </div>
    </>
  );
}
