import React from "react";
import styled from "styled-components";
import ScrollContainer from 'react-indiana-drag-scroll'

const Hour = ({ weather }) => {

  return (
    
      <Container className="scroll-container">
        {weather.hourly
          .filter((i, index) => index < 20)
          .map((data, index) => {
            const date = new Date(data.dt * 1000).toLocaleTimeString([], {
              timeStyle: "short",
            });

            return (
              <Wrap key={index}>
                <Time>{date}</Time>

                {data.weather.map((icon, index) => (
                  <img
                    key={index}
                    src={`http://openweathermap.org/img/wn/${icon.icon}@2x.png`}
                    alt="weather"
                  />
                ))}

                <p>{data.temp.toFixed(0)}°</p>
              </Wrap>
            );
          })}
      </Container>
    
  );
};

export default Hour;

const Container = styled(ScrollContainer)`
  display: flex;
  cursor: grab;
`;

const Wrap = styled.div`
  width: 100px;
  margin-left: -4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 19px;
  font-weight: 500;
  @media(max-width: 670px){
    width: 74px;
    height: 150px;
    img{
      width: 70px;
    }
    p{
      font-size: 14px;
    }
  }

`;

const Time = styled.p`
  font-size: 16px;

`