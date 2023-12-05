import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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

interface InitChat {
  message: string;
}

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [focusForm, setFocusForm] = useState<boolean>(false);
  const [characters, setCharacters] = useState<number>(100);
  const maxCharacters = 100;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InitChat>();

  const onSubmit: SubmitHandler<InitChat> = async ({ message }) => {
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

          <div className="mb-16">
            <C.InputInit onFocus={() => setFocusForm(true)} onBlur={() => setFocusForm(false)} className={`${focusForm && "border-sw-blue"} hover:border-sw-blue`} onSubmit={handleSubmit(onSubmit)}>
              <C.Input
                type="text"
                placeholder="Comece por aqui..."
                maxLength={maxCharacters}
                {...register("message", {
                  required: "Digite uma mensagem para começar",
                  onChange(event) {
                    const newValue = event.target.value;

                    const numberOfCaracters = maxCharacters - newValue.length;

                    newValue.length <= maxCharacters && setCharacters(numberOfCaracters);
                  },
                })}
              />
              <span className="pl-2">{characters}/100</span>
              <C.Send>
                <IoMdSend className="text-white group-hover:scale-125 group-hover:rotate-[360deg] duration-300 transition-all" />
              </C.Send>
            </C.InputInit>
            <span className="text-red-500 text-sm flex mt-1">{errors.message?.message}</span>
          </div>

          <C.Comments>
            <C.BoxComment>
              <BsStars className="mx-auto group-hover:scale-150 group-hover:text-sw-blue transition-all" />
              <C.BoxTitle>Limpo e preciso</C.BoxTitle>
              <C.BoxDescription>
                Agilidade e eficiência na sua negociação online.
              </C.BoxDescription>
            </C.BoxComment>
            <C.BoxComment>
              <BiTargetLock className="mx-auto group-hover:scale-150 group-hover:text-sw-blue transition-all" />
              <C.BoxTitle>Respostas assertivas</C.BoxTitle>
              <C.BoxDescription>
                Conversas claras, decisões rápidas, resultados certeiros.
              </C.BoxDescription>
            </C.BoxComment>
            <C.BoxComment>
              <IoIosTrendingUp className="mx-auto group-hover:scale-150 group-hover:text-sw-blue transition-all" />
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
