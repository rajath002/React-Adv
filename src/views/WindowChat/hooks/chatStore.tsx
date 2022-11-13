import { useState } from "react";
import { IMessage } from "../interface";

export default function useChatStore() {
  const [state, setState] = useState<IMessage[]>([]);

  const sendMessage = (text: IMessage) => {
    setState(() => [...state, text]);
  };

  const getMessageCount = () => state.length;

  return {
    state,
    setState,
    sendMessage,
    getMessageCount,
  };
}
