import styled, { keyframes } from "styled-components";
const spin = keyframes`
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
`;

export const DivLoader = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const SvgLoader = styled.svg`
  animation: ${spin} 0.5s linear infinite;
  margin: auto;
`;
