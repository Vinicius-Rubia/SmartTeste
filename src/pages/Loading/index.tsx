import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { images } from "../../utils/images";
import * as C from "./styles";

const Loading: React.FC = () => {
  const [loading, setLoading] = useState<number>(1);
  const navigate = useNavigate();
  const angle = loading * 3.6;

  useEffect(() => {
    if (loading <= 99) {
      setTimeout(() => {
        setLoading(loading + 1);
      }, 30);
    } else {
      setTimeout(() => {
        clearTimeout(0);
        navigate("welcome");
      }, 3000);
    }
  }, [loading]);

  return (
    <C.Container style={{ background: `conic-gradient(from ${angle}deg at 50% 50%, #27242C 0deg, #181719 360deg)`}}>
      <>
        <C.Loading>
          <C.Border>
            <div className="animate-spin">
              <C.Logo src={images.IconSmartWaysRounded} alt="Logo" />
            </div>
          </C.Border>
        </C.Loading>
        {loading < 100 ? (
          <C.Text>Carregando... {loading}%</C.Text>
        ) : (
          <C.TextSuccess>Iniciando</C.TextSuccess>
        )}
      </>
    </C.Container>
  );
};

export default Loading;
