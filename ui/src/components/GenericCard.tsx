import React from "react";
import { Link as ReactLink } from "react-router-dom";
import Link from "@mui/material/Link";
import styled from "@emotion/styled";

interface CardProps {
  id: number;
  cardTitle: React.ReactNode;
  itemsList?: any[];
  cardBodyItem?: (el: any) => React.ReactNode;
  children?: React.ReactNode | string | null;
}

export const GenericCard: React.FC<CardProps> = ({
  id,
  cardTitle,
  itemsList,
  children,
}) => {
  return (
    <CardContainer key={id}>
      <CardTitle>{cardTitle}</CardTitle>
      <CardBody>
        {itemsList?.map((item: any) => (
          <CardBodyItem key={item.id}>
            <Link
              to={`/project/${id}/tasklist/${item.id}`}
              component={ReactLink}
              underline={"none"}
              color="black"
            >
              {item.name}
            </Link>
          </CardBodyItem>
        ))}
        {children}
      </CardBody>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  width: 30vmax;
  border: 2px solid #aaa3a3;
  margin: 1.5rem 0.5rem 1.5rem 0.5rem;
  overflow: hidden;
`;

const CardTitle = styled.div`
  background-color: #00d3ff;
  padding: 0.33rem 0 0.33rem 1rem;
  border-bottom: 1px solid;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
`;
const CardBodyItem = styled.div`
  margin: 0.3rem 0rem 0.3rem 0.3rem;
`;
