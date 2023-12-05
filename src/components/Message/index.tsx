import { motion } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import { selectChat } from "../../redux/chatSlice";
import * as C from "./styles";

export const Message: React.FC = () => {
  const { messages } = useSelector(selectChat);

  return messages.map((message) => (
    <React.Fragment key={message.id}>
      {message.author === "user" ? (
        <motion.div
          className="flex flex-col items-end gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <C.Message className="bg-[#383838] ml-auto rounded-tl-md rounded-tr-none">
            {message.message}
          </C.Message>
          <C.Hour className="ml-auto mr-1">
            {message.createdAt?.toString()}
          </C.Hour>
        </motion.div>
      ) : (
        <motion.div
          className="flex flex-col items-start gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <C.Message className="bg-sw-blue-medium mr-auto rounded-tr-md rounded-tl-none">
            {message.message}
          </C.Message>
          <C.Hour className="mr-auto ml-1">
            {message.createdAt?.toString()}
          </C.Hour>
        </motion.div>
      )}
    </React.Fragment>
  ));
};
