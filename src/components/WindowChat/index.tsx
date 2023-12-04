import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Message } from "..";
import { selectChat } from "../../redux/chatSlice";
import * as C from "./styles";

export const WindowChat: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { status } = useSelector(selectChat);

  const handleScrollDown = () => {
    const { current } = scrollRef;
    current!.scrollTop = current!.scrollHeight;
  };

  useEffect(() => {
    handleScrollDown();
  }, [status]);
  return (
    <C.Container ref={scrollRef}>
      <Message />
    </C.Container>
  );
};
