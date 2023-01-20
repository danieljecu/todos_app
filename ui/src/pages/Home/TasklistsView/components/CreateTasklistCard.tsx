import React from "react";
import { useParams } from "react-router-dom";
import { TasklistCardContainer, CardTitle } from "./styled";
import { ITasklistDetails } from "interfaces";
import { TextField, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

interface TasklistCardProps {
  addTasklist: (tasklist: ITasklistDetails) => void;
}

export const CreateTasklistCard: React.FC<TasklistCardProps> = ({
  addTasklist,
}) => {
  const { projectId } = useParams();
  const [tasklist, setTasklist] = React.useState<ITasklistDetails>({
    id: Math.random(),
    project_id: Number(projectId),
    name: "",
    tasks: [],
  });

  const handleCreate = (e: any) => {
    e.preventDefault();

    const newTasklist = {
      ...tasklist,
      id: Math.random(), //TODO : maybe this already exists?
    };
    console.log("CreateTasklistCard add tasklist", newTasklist);
    if (addTasklist) {
      addTasklist(newTasklist);
    }
  };

  return (
    <Card elevation={5}>
      <CardContent
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          // padding: "0.33rem 0 0.33rem 1rem",
          height: "2rem",
          alignItems: "center",
        }}
      >
        <TextField
          variant="standard"
          onChange={(e) => {
            setTasklist((prevState) => ({
              ...prevState,
              name: e.target.value,
            }));
          }}
          value={tasklist.name}
          label="Input tasklist name"
        />
        <Button
          size="medium"
          variant="outlined"
          color="secondary"
          className="ml-2 float-right"
          type="submit"
          onClick={handleCreate}
        >
          ✎ Add Tasklist
        </Button>
      </CardContent>
    </Card>
  );
};
