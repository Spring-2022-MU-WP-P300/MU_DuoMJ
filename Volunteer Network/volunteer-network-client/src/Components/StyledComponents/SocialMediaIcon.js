import styled from "styled-components";
const SocialMediaIcon = styled.i`
  cursor: pointer;
  border: 1px solid #dddddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
  &:hover {
    color: white;
    background-color: blue;
    transition: 0.5s;
  }
`;

export default SocialMediaIcon;
