import React from "react";
import styled from "styled-components";

const Hour = ({ weather }) => {
  return (
    <Container>
      {weather.daily
        .filter((i, index) => index > 0) // start from next day
        .map((data, index) => {
          const date = new Date(data.dt * 1000).toLocaleString([], {
            weekday: "short",
          });
          const day = new Date(data.dt * 1000).toLocaleDateString([], {
            day: "2-digit",
            month: "long",
          });

          return (
            <Wrap key={index}>

              <p>{`${date},  ${day}`}</p>

              {data.weather.map((icon, index) => (
                <img
                  key={index}
                  src={`http://openweathermap.org/img/wn/${icon.icon}@2x.png`}
                  alt="weather"
                />
              ))}

              <p>{data.temp.max.toFixed(0)}° / {data.temp.min.toFixed(0)}°</p>

            </Wrap>
          );
        })}
    </Container>
  );
};

export default Hour;

const Container = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid rgb(226, 226, 226);
  width: 95%;
  margin: auto;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  font-size: 19px;
  font-weight: 500;
  border-bottom: 1px solid white;
  
  img{
    width: 68px;
    height: 100%;
  }
  @media(max-width: 670px){
    font-size: 16px;
  }
`;
