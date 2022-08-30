import styled from "@emotion/styled/macro";
// import styled from "@emotion/styled";
// import { MyThemeType } from "styles/theme";
// import { styled, alpha } from "@mui/material/styles";
// import { styled } from "@mui/system";

const ProjectCardContainer = styled.div`
  width: 30vmax;
  border: 2px solid #aaa3a3;
  margin: 1.5rem 0.5rem 1.5rem 0.5rem;
  overflow: hidden;
`;

const TasklistCardContainer = styled.div`
  width: 30vmax;
  border: 2px solid #aaa3a3;
  margin: 1.5rem 0.5rem 1.5rem 0.5rem;
  overflow: hidden;
`;

//TODO: make emotion theme work
//https://stackoverflow.com/questions/64537040/emotion-theming-with-typescript-property-x-does-not-exist-on-type-object-t
//https://codesandbox.io/s/9z2md?file=/src/App.tsx
// const CardTitle = styled.div(

const CardTitle = styled.div`
  background-color: ${({ theme }) => `${theme.pallete.primary}`};

  padding: 0.33rem 1rem 0.33rem 1rem;
  border-bottom: 1px solid;
`;

const StyledTextField = styled("div")(
  ({ theme }) => `
  margin: ${theme.spacing(1)};
  background-color: ${theme.palette.primary.main};
  /* ... */
`
);
const CardCreateTitle = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #00d3ff;
  padding: 0.33rem 0 0.33rem 1rem;
  border-bottom: 1px solid;
`;

const CardBody = styled.div`
  display: flex;
  padding: 0.33rem 1rem 0.33rem 1rem;
  flex-direction: column;
`;
const CardBodyItem = styled.div`
  margin: 0.1rem;
`;

export {
  ProjectCardContainer,
  TasklistCardContainer,
  CardTitle,
  CardCreateTitle,
  CardBody,
  CardBodyItem,
};
