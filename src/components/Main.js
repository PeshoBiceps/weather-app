import { useState } from "react";
import styled from "styled-components";

const Main = ({ weather }) => {
  const [fade, setFade] = useState(false);

  const changeOpacity = () => {
    if (window.scrollY >= 110) {
      setFade(true);
    } else {
      setFade(false);
    }
  };

  window.addEventListener("scroll", changeOpacity);

  let date = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Container>
      <Wrap style={fade ? { opacity: 0 } : { opacity: 1 }}>
        <Temp>{weather.current.temp?.toFixed(0)}°</Temp>
        {weather.current.weather.map((data, index) => (
          <p key={index}>{data.main}</p>
        ))}
      </Wrap>
      <LastUpdate>{`Last updated: ${date}`}</LastUpdate>
    </Container>
  );
};

export default Main;

const Container = styled.div`
  border-bottom: 1px solid rgb(226, 226, 226);
  width: 95%;
  margin: auto;
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 40px;
  transition: 0.2s ease-in-out;
`;
const Temp = styled.span`
  font-size: 70px;
`;

const LastUpdate = styled.span`
  padding: 8px;
  display: flex;
  justify-content: flex-end;
`;
