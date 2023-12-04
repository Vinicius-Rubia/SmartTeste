import React, { ChangeEvent, FormEvent, useState } from "react";
import { BiTargetLock } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import { IoIosTrendingUp, IoMdSend } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Menu from "../../components/Menu";
import { setMessages, setStatusResponse } from "../../redux/chatSlice";
import { images } from "../../utils/images";
import transition from "../../utils/transition";
import * as C from "./styles";

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState<string>("");

  const maxCharacters = 100;
  const numberOfCaracters = maxCharacters - message.length;

  const handleMessage = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    newValue.length <= maxCharacters && setMessage(newValue);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    navigate("/chat");
    dispatch(setMessages({ author: "user", message: message }));
    dispatch(setStatusResponse(true));

    // const responseMessage = await Bot.post("completions") as MessageResponse;
    // dispatch(setMessages({ author: "IA", message: responseMessage.choices[0].message.content }));
    setTimeout(() => {
      dispatch(setMessages({ author: "IA", message: "Entendi sua resposta" }));
      dispatch(setStatusResponse(false));
    }, 3000);
  };

  return (
    <C.Container>
      <C.RoundedBlur />
      <C.Layout id="layout">
        <C.Content>
          {Menu}
          <C.Title>
            Bem vindo a <C.TitleDecoration>SmartWays</C.TitleDecoration>
          </C.Title>
          <C.SubTitle>O seu assistente de negociação virtual</C.SubTitle>

          <C.InputInit onSubmit={handleSubmit}>
            <C.Input
              type="text"
              placeholder="Comece por aqui..."
              value={message}
              onChange={handleMessage}
            />
            <span className="pl-2">{numberOfCaracters}/100</span>
            <C.Send>
              <IoMdSend className="text-white" />
            </C.Send>
          </C.InputInit>

          <C.Comments>
            <C.BoxComment>
              <BsStars className="mx-auto group-hover:scale-150 transition-all" />
              <C.BoxTitle>Limpo e preciso</C.BoxTitle>
              <C.BoxDescription>
                Agilidade e eficiência na sua negociação online.
              </C.BoxDescription>
            </C.BoxComment>
            <C.BoxComment>
              <BiTargetLock className="mx-auto group-hover:scale-150 transition-all" />
              <C.BoxTitle>Respostas assertivas</C.BoxTitle>
              <C.BoxDescription>
                Conversas claras, decisões rápidas, resultados certeiros.
              </C.BoxDescription>
            </C.BoxComment>
            <C.BoxComment>
              <IoIosTrendingUp className="mx-auto group-hover:scale-150 transition-all" />
              <C.BoxTitle>Eficiência</C.BoxTitle>
              <C.BoxDescription>
                O caminho mais rápido para resultados eficazes.
              </C.BoxDescription>
            </C.BoxComment>
          </C.Comments>

          <a href="https://github.com/Vinicius-Rubia" target="_blank">
            <C.IconGitHub />
          </a>
        </C.Content>
      </C.Layout>

      <C.WaveOne src={images.waveOne} />
      <C.WaveTwo src={images.waveTwo} />
    </C.Container>
  );
};

export default transition(Welcome);
