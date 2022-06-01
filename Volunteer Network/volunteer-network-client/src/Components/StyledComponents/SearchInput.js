import styled from "styled-components";
export const SearchInputWrapper = styled.div`
  max-width: 550px;
  margin: 40px auto;
  position: relative;
`;

export const MainSearchInput = styled.div`
  background: #fff;
  &::before {
    content: "";
    position: absolute;
    bottom: -40px;
    width: 50px;
    height: 1px;
    background: rgba(255, 255, 255, 0.41);
    left: 50%;
    margin-left: -25px;
  }
  @media only screen and (max-width: 768px) {
    background: rgba(255, 255, 255, 0.2);
    padding: 14px 20px 10px;
    border-radius: 10px;
    box-shadow: 0px 0px 0px 10px rgba(255, 255, 255, 0);
  }
`;

export const MainSearchInputItem = styled.div`
  @media only screen and (max-width: 768px) {
    width: 100%;
    border: 1px solid #eee;
    height: 50px;
    border: none;
    margin-bottom: 10px;
  }
`;

export const SearchInput = styled.input`
  float: left;
  border: none;
  border: 1px solid rgb(139, 139, 139);
  width: 100%;
  height: 50px;
  padding-left: 20px;
  border-radius: 35px !important;
  &:focus {
    outline: 0;
  }
`;

export const SearchButton = styled.button`
  position: absolute;
  background: #3d6df1;
  right: 0px;
  height: 50px;
  width: 120px;
  color: #fff;
  top: 0;
  border: none;
  cursor: pointer;
  border-radius: 35px;
`;
