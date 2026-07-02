import styled from "@emotion/styled";
import Theme from "styles/theme";

export const HeaderBar = styled.nav`
  background-color: ${Theme.colors.navyDark};
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;
