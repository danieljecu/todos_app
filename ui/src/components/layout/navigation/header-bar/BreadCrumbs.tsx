import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import ListItem, { ListItemProps } from "@mui/material/ListItem";
import Collapse from "@mui/material/Collapse";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import Link, { LinkProps } from "@mui/material/Link";
import {
  Link as ReactLink,
  Route,
  Routes,
  MemoryRouter,
  useLocation,
} from "react-router-dom";

interface ListItemLinkProps extends ListItemProps {
  to: string;
  open?: boolean;
}

const breadcrumbNameMap: { [key: string]: string } = {
  "/projects": "projects",
  "/projects/{default}": "default",
  "/tasklist/": "tasklist",
  "/tasklist/:id/task/1": "tasklist",
  "/task": "task",
};

function ListItemLink(props: ListItemLinkProps) {
  const { to, open, ...other } = props;
  const primary = breadcrumbNameMap[to];

  let icon = null;
  if (open != null) {
    icon = open ? <ExpandLess /> : <ExpandMore />;
  }

  return (
    <li>
      <ListItem button component={ReactLink as any} to={to} {...other}>
        <ListItemText primary={primary} />
        {icon}
      </ListItem>
    </li>
  );
}

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

const LinkRouter = (props: LinkRouterProps) => (
  <Link {...props} component={ReactLink as any} />
);

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export function BasicBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  console.log(location, pathnames);
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" to="/" component={ReactLink}>
          My projects
        </Link>

        <Link
          underline="hover"
          color="inherit"
          to={`/projects/${pathnames[1]}`}
          component={ReactLink}
        >
          <Typography color="text.primary">project: {pathnames[1]}</Typography>
        </Link>

        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;

          return last ? (
            <Typography color="text.primary" key={to}>
              {breadcrumbNameMap[to]}
            </Typography>
          ) : (
            <LinkRouter underline="hover" color="inherit" to={to} key={to}>
              {breadcrumbNameMap[to]}
            </LinkRouter>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}

export default function BreadCrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <div>
      BreadCrumbs
      <BasicBreadcrumbs />
    </div>
  );
}

// project/19
///tasklist/4
// /tasklist/4/task/13
//

// export function RouterBreadcrumbs() {
//     const [open, setOpen] = React.useState(true);

//     const handleClick = () => {
//       setOpen((prevOpen) => !prevOpen);
//     };

//     return (
//       <MemoryRouter initialEntries={["/projects"]} initialIndex={0}>

//         {/* <Box sx={{ display: "flex", flexDirection: "column", width: 360 }}> */}
//           <Routes>
//             <Route path="*" element={<Page />} />
//           </Routes>

//       </MemoryRouter>
//     );
//   }
