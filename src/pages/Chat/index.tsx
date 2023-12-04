import React, { ChangeEvent, useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useDispatch } from "react-redux";
import { Header, WindowChat } from "../../components";
import { setMessages, setStatusResponse } from "../../redux/chatSlice";
import { images } from "../../utils/images";
import transition from "../../utils/transition";
import * as C from "./styles";

const Chat: React.FC = () => {
  const dispatch = useDispatch();

  const [countdown, setCountdown] = useState(20);
  const [message, setMessage] = useState<string>("");
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const maxCharacters = 100;
  const numberOfCaracters = maxCharacters - message.length;

  const handleMessage = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    newValue.length <= maxCharacters && setMessage(newValue);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsInputDisabled(true);
    setCountdown(20);

    // openNotification({position: "top", type: "info", title: "Resulado: Get Debts", description: `{
    //   "customerId": "12345678902",
    //   "dealId": 1,
    //   "value": 1000,
    //   "discount": 500,
    //   "totalValue": 500,
    //   "paymentId": 101,
    //   "isPaid": false,
    // }`});

    dispatch(setMessages({ author: "user", message: message }));
    setMessage("");

    dispatch(setStatusResponse(true));

    // const responseMessage = await Bot.post("completions") as MessageResponse;
    // dispatch(setMessages({ author: "IA", message: responseMessage.choices[0].message.content }));
    dispatch(setMessages({ author: "IA", message: "Entendi sua resposta" }));
    dispatch(setStatusResponse(false));
  };

  useEffect(() => {
    let timer: any;

    if (isInputDisabled) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isInputDisabled]);

  useEffect(() => {
    if (countdown === 0) {
      setIsInputDisabled(false);
    }
  }, [countdown]);

  return (
    <C.Container>
      <C.RoundedBlur />
      <C.Layout>
        <C.Content>
          <Header />

          <WindowChat />

          <C.InputInit onSubmit={handleSubmit}>
            <C.Input
              disabled={isInputDisabled}
              type="text"
              maxLength={100}
              placeholder={
                isInputDisabled
                  ? `Aguarde a IA terminar de responder... ${
                      countdown > 0 && `Aguarde ${countdown} segundos`
                    }`
                  : "Digite sua mensagem"
              }
              value={message}
              onChange={handleMessage}
            />
            <span className="pl-2">{numberOfCaracters}/100</span>
            <C.Send
              disabled={message === ""}
              className="disabled:cursor-not-allowed"
              onClick={handleSubmit}
            >
              <IoMdSend />
            </C.Send>
          </C.InputInit>
        </C.Content>
      </C.Layout>

      <C.WaveOne src={images.waveOne} />
      <C.WaveTwo src={images.waveTwo} />
    </C.Container>
  );
};

export default transition(Chat);
