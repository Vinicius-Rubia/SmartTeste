import React from "react";
import { useSelector } from "react-redux";
import { selectChat } from "../../redux/chatSlice";
import { images } from "../../utils/images";
import Menu from "../Menu";
import * as C from "./styles";

export const Header: React.FC = () => {
  const { status } = useSelector(selectChat);

  return (
    <C.Header>
      <C.Head>
        <C.ImgLogo src={images.smartWaysLogo} alt="Logo" />
        <div>
          <C.TitleChat>SMARTWAYS</C.TitleChat>
          <C.Status>{status ? "Digitando...": "Online"}</C.Status>
        </div>
      </C.Head>
      <div className="absolute right-3 top-5">
        {Menu}
      </div>
    </C.Header>
  );
};
