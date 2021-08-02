import { useState } from "react";
import styled from "styled-components";
import Search from "./Search";
import Menu from "./Menu";

const Navbar = ({ locationName }) => {
  const [navbar, setNavbar] = useState(false);

  const changeNav = () => {
    if (window.scrollY >= 110) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeNav);

  return (
    <Container
      style={
        navbar
          ? { backgroundColor: "#4c768b" }
          : { backgroundColor: "transparent" }
      }
    >
      <Zone>{locationName}</Zone>
      <Search />
      <Menu />
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  z-index: 999;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  padding: 20px;
  font-size: 22px;
  transition: 0.1s ease-in-out;
`;
const Zone = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
