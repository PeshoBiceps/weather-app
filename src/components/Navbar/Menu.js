import { useState } from "react";
import styled from "styled-components";
import { FaEllipsisV } from "react-icons/fa";
import { motion } from "framer-motion";
import { uni } from "../../features/location/locationSlice";
import { useSelector, useDispatch } from "react-redux";

const Menu = () => {
  const [menu, setMenu] = useState(false);
  const [options, setOptions] = useState(false);

  const location = useSelector((state) => state.location);
  const dispatch = useDispatch();

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { display: 'none', opacity: 0, x: 0 },
  };

  const onChangeValue = (e) => {
    dispatch(
      uni({
        units: e.target.value,
      })
    );

    setOptions(false);
  };

  return (
    <Container>
      <MenuIcon onClick={() => setMenu(!menu)} />
      <motion.div animate={menu ? "open" : "closed"} variants={variants}>
        <Wrap>
          <WrapItems>
            <span
              onClick={() => {
                setOptions(!options);
                setMenu(false);
              }}
            >
              Change units
            </span>
          </WrapItems>
        </Wrap>
      </motion.div>
      <motion.div animate={options ? "open" : "closed"} variants={variants}>
        {options ? (
          <Options>
            <span>Change units</span>
            <Options2>
              <div>
                <label>
                  <input
                    type="radio"
                    id="cel"
                    name="options"
                    value="metric"
                    checked={location.units === "metric"}
                    onChange={onChangeValue}
                  />
                  Celsius
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    id="far"
                    name="options"
                    value="imperial"
                    checked={location.units === "imperial"}
                    onChange={onChangeValue}
                  />
                  Farenheit
                </label>
              </div>
            </Options2>
          </Options>
        ) : (
          ""
        )}
      </motion.div>
    </Container>
  );
};

export default Menu;

const Container = styled.div``;

const MenuIcon = styled(FaEllipsisV)`
  position: fixed;
  top: 24px;
  right: 20px;
  cursor: pointer;
  @media(max-width: 768px){
    cursor: none;
  }
`;
const Wrap = styled.div`
  position: fixed;
  top: 54px;
  right: 44px;
  width: 140px;
  height: 50px;
  background-color: #313131;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.75);
`;
const WrapItems = styled.div`
  padding: 0 14px 0 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span {
    padding: 6px 0 6px 0;
    font-size: 18px;
    font-weight: 300;
    letter-spacing: 1px;
    cursor: pointer;
  }
`;
const Options = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
  height: 120px;
  background-color: #313131;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  span {
    font-size: 16px;
    margin-top: -10px;
  }
`;

const Options2 = styled.div`
  margin-top: 10px;
  font-size: 20px;

  div {
    padding: 2px;
    :first-child {
      border-bottom: 1px solid #5a5a5a;
    }
  }
  label {
    cursor: pointer;
    width: 100%;
    display: block;
    height: 100%;
    z-index: 999999;
  }
`;
