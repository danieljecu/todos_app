import {
  Grid,
  Button,
  FormControlLabel,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  LinearProgress,
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { Theme } from "@mui/material/styles";
import styled from "@emotion/styled";

const materialStyles = (theme: Theme) => ({
  paper: {
    margin: theme.spacing(4, 2),
  },
  ellipsisText: {
    maxWidth: "200px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "350px",
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "700px",
    },
  },
});

export const MuiFormControlLabel = styled(FormControlLabel)`
  .MuiTypography-body1 {
    font-size: unset;
  }
`;

export const TableContainer = styled.div`
  position: relative;
`;

export const ModalTitleWrapper = styled.div`
  text-align: center;
  width: 147px;
`;

export const MuiButton = styled(Button)``;
export const MuiSkeleton = styled(Skeleton)``;
export const MuiTable = styled(Table)``;
export const MuiTableBody = styled(TableBody)``;
export const MuiTableCell = styled(TableCell)``;
export const MuiFirstHeaderTableCell = styled(TableCell)`
  white-space: nowrap;
`;
export const MuiFirstBodyTableCell = styled(TableCell)`
  padding-right: 0px;
`;
export const MuiSecondBodyTableCell = styled(TableCell)`
  padding-left: 10px;
`;
export const ImageThumbnail = styled.img`
  width: 30px;
`;
export const MuiTableHead = styled(TableHead)``;
export const MuiTableRow = styled(TableRow)``;
export const MuiTypography = styled(Typography)<{ paddingY?: string }>`
  padding-top: ${({ paddingY }) => paddingY || 0};
  padding-bottom: ${({ paddingY }) => paddingY || 0};
`;

export const BoldText = styled.span`
  font-weight: bold;
`;

export const ItalicText = styled.span`
  font-style: italic;
`;

export const Stack = styled.div`
  & > * {
    display: flex;
    align-items: center;
  }
  & > * + * {
    margin-top: 15px;
  }
`;

export const SlimWrapper = styled.div`
  max-width: 800px;
`;

export const VerticalSpacer = styled.div`
  margin-top: 15px;
`;

export const ResetUnorderedList = styled.ul`
  padding: 0;

  li {
    list-style-type: none;
  }
`;

export const StepperTitle = styled(Typography)`
  font-weight: 500;
  font-size: 1.5rem;
  margin: 15px 0px 0px;
`;
export const Breadcrumbs = styled.div`
  margin: -20px 0 15px;
  font-weight: 100;
`;
export const TitleContainer = styled(Grid)`
  margin: 15px 0px;
`;

/*
text-transform: capitalize; does not work on div/span
with uppercase text
*/
export const CapitalizedText = styled.div`
  text-transform: lowercase;

  &::first-letter {
    text-transform: uppercase;
  }
`;
