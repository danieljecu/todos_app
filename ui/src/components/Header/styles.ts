import styled from "@emotion/styled";
// import styled from 'styled-components';

export const  HeaderBar = styled.nav`
  background-color: #282c34;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  border: 2px solid #3a3636;
  color: black;
  margin-bottom: 25px;
  padding-right: 10px;
  align-items: center;
`;
