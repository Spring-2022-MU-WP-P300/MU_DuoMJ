import styled from "styled-components";
const colors = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#795548",
  "#9e9e9e",
  "#607d8b",
  "#000000",
];
const generateColor = () => colors[Math.floor(Math.random() * colors.length)];

export const EventTitleDiv = styled.div`
  background-color: ${generateColor};
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  bottom: 64px;
  width: 100%;
  color: white;
  font-size: 20px;
  height: 65px;
  text-align: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const EventImage = styled.img`
  border-radius: 15px;
  cursor: pointer;
`;
