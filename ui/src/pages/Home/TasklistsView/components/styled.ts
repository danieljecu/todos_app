import styled from "@emotion/styled";

const TasklistCardContainer = styled.div`
  width: 100%;
  border: 2px solid #aaa3a3;
  border-radius: 4px;
  margin: 1.5rem 0.5rem 1.5rem 0.5rem;
  overflow: hidden;
`;

const CardTitle = styled.div`
  background-color: #00d3ff;
  padding: 0.33rem 1rem 0.33rem 1rem;
  border-bottom: 1px solid;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
`;
const CardBodyItem = styled.div`
  padding: 0.3rem 0.3rem 0.3rem 0.3rem;
`;

export { TasklistCardContainer, CardTitle, CardBody, CardBodyItem };
