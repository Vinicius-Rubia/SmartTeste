import { message } from "antd";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Menu from "../../components/Menu";
import { environment } from "../../environment/environments";
import { selectChat, setContext } from "../../redux/chatSlice";
import { setModal } from "../../redux/modalSlice";
import { Modal } from "../../shared";
import { images } from "../../utils/images";
import transition from "../../utils/transition";
import * as C from "./styles";

const Context: React.FC = () => {
  const [fileContent, setFileContent] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const dispatch = useDispatch();
  const { context } = useSelector(selectChat);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile && selectedFile.type === "text/plain") {
      setFileName(selectedFile.name);
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target) {
          const fileText = e.target.result as string;
          setFileContent(fileText);
        }
      };
      reader.readAsText(selectedFile);
      
    } else {
      dispatch(setModal({ title: "Houve um problema...", message: "O arquivo selecionado não é do tipo .txt. Tente novamente carregar um arquivo que contenha a extensão .txt", type: "error", buttonMessage: ["OK"], isActive: false}));
    }
  };

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setFileContent(newText);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (fileContent) {
      dispatch(setContext(fileContent));
    } else {
      dispatch(setContext(context));
    }

    message.success("Contexto salvo com sucesso!");
  }

  const backOriginalContext = () => {
    setFileContent("");
    dispatch(setContext(environment.INITIAL_CONTEXT));
  }

  return (
    <C.Container>
      <C.RoundedBlur />
      <C.Layout id="layout">
        <C.Content>
          {Menu}
          <C.Title>
            Escolha um arquivo para o{" "}
            <C.TitleDecoration>Contexto</C.TitleDecoration>
          </C.Title>

          <C.Context onSubmit={onSubmit}>
            <C.EditContext>
              <C.Upload>
                <C.IconUpload />
                <p>
                  <strong>{fileName ? fileName : "Procurar arquivo"}</strong>
                </p>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </C.Upload>

              <C.ViewText
                value={fileContent ? fileContent : context}
                onChange={handleTextareaChange}
                placeholder="Carregue um arquivo para visualizar aqui o conteúdo..."
              />

              <C.BackOriginalContext type="button" onClick={backOriginalContext}>Voltar para versão original</C.BackOriginalContext>

              <C.BtnSaveContext>Salvar contexto</C.BtnSaveContext>
            </C.EditContext>

            <C.ViewContent>
                <C.BallsIllutration>
                  <C.BallOne></C.BallOne>
                  <C.BallTwo></C.BallTwo>
                  <C.BallThree></C.BallThree>
                </C.BallsIllutration>
                {fileContent && <C.ContentFile readOnly value={fileContent.replace(/(\d+)\./g, "\n\n$1.")} />}
                {(context && !fileContent) && <C.ContentFile readOnly value={context.replace(/(\d+)\./g, "\n\n$1.")} />}
            </C.ViewContent>
          </C.Context>

          <a href="https://github.com/Vinicius-Rubia" target="_blank">
            <C.IconGitHub />
          </a>
        </C.Content>
      </C.Layout>


      <Modal />

      <C.WaveOne src={images.waveOne} />
      <C.WaveTwo src={images.waveTwo} />
    </C.Container>
  );
};

export default transition(Context);
