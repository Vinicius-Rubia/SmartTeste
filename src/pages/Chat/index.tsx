import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoMdSend } from "react-icons/io";
import { useDispatch } from "react-redux";
import { Header, WindowChat } from "../../components";
import { setMessages, setStatusResponse } from "../../redux/chatSlice";
import { images } from "../../utils/images";
import transition from "../../utils/transition";
import * as C from "./styles";

interface InitChat {
  message: string;
}

const Chat: React.FC = () => {
  const dispatch = useDispatch();

  const [countdown, setCountdown] = useState(20);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [focusForm, setFocusForm] = useState<boolean>(false);
  const [characters, setCharacters] = useState<number>(100);
  const maxCharacters = 100;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<InitChat>();

  const onSubmit: SubmitHandler<InitChat> = async ({ message }) => {
    setIsInputDisabled(true);
    setCountdown(20);
    setCharacters(100);
    setFocusForm(false);

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
    setValue("message", "");

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

          <div>
            <C.InputInit onFocus={() => setFocusForm(true)} onBlur={() => setFocusForm(false)} className={`${focusForm && !isInputDisabled && "border-sw-blue"} ${!isInputDisabled && "hover:border-sw-blue"}`} onSubmit={handleSubmit(onSubmit)}>
              <C.Input
                disabled={isInputDisabled}
                type="text"
                maxLength={maxCharacters}
                placeholder={isInputDisabled ? `${countdown > 0 && `Aguarde ${countdown} segundos para continuar`}` : "Digite sua mensagem"}
                {...register("message", {
                  required: "Mensagem é necessária",
                  onChange(event) {
                    const newValue = event.target.value;

                    const numberOfCaracters = maxCharacters - newValue.length;

                    newValue.length <= maxCharacters && setCharacters(numberOfCaracters);
                  },
                })}
              />
              <span className="pl-2">{characters}/100</span>
              <C.Send
                disabled={isInputDisabled}
                className="disabled:cursor-not-allowed"
                onClick={handleSubmit(onSubmit)}
              >
                <IoMdSend className="text-white group-hover:scale-125 group-hover:rotate-[360deg] duration-300 transition-all" />
              </C.Send>
            </C.InputInit>
            <span className="text-red-500 text-sm flex mt-1 ml-3 md:ml-9">{errors.message?.message}</span>
          </div>
        </C.Content>
      </C.Layout>

      <C.WaveOne src={images.waveOne} />
      <C.WaveTwo src={images.waveTwo} />
    </C.Container>
  );
};

export default transition(Chat);
