import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { set } from "../../features/location/locationSlice";
import { useDispatch } from "react-redux";

const Search = () => {

  const API_KEY_TOWN = "AIzaSyAur8vM6LHIwFUGu1GnXegx8vlvgTzdvaU";

  const [search, setSearch] = useState(false);
  const [town, setTown] = useState('');

  const dispatch = useDispatch();

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: 0 },
  };

  const searchTown = async () => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${town}&key=${API_KEY_TOWN}`
    );
    const data = await response.json();

    dispatch(
      set({
        lat: data.results[0].geometry.location.lat,
        lon: data.results[0].geometry.location.lng,
      })
    );
  };

  const handleClick = (e) => {
    e.preventDefault()
    setTown('')
  }

  return (
    <Container>
      <SearchIcon onClick={() => setSearch(!search)} />
      <motion.div animate={search ? "open" : "closed"} variants={variants}>
        <Form onSubmit={handleClick}>
          <Input
            type="text"
            onChange={(e) => setTown(e.target.value)}
            value={town}
          />
          <Button disabled={!town} type="submit" onClick={() => { searchTown(); setSearch(false) }}>Search</Button>
        </Form>
      </motion.div>
    </Container>
  );
};

export default Search;

const Container = styled.div`
  position: fixed;
  top: 21px;
  left: 55px;
  @media (max-width: 508px){
    right: 55px;
  }
`;

const Form = styled.form`
  display: flex;
  height: 28px;
  background-color: #e2e2e2;
  box-shadow: 1px 1px 6px 0px rgba(0, 0, 0, 0.75);
  width: 100%;
`;
const Input = styled.input`
  border: none;
  outline: none;
  padding-left: 8px;
  font-size: 14px;
  width: 100%;

`;

const Button = styled.button`
  background-color: #acacac;
  color: white;
  font-weight: 500;
  border: none;
  outline: none;
  cursor: pointer;
  @media(max-width: 768px){
    cursor: none;
  }
  
`;
const SearchIcon = styled(FaSearch)`
  position: fixed;
  top: 24px;
  left: 20px;
  cursor: pointer;
  @media(max-width: 768px){
    cursor: none;
  }
`;
