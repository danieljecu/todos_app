import React from "react";
import { useParams } from "react-router-dom";
import { TasklistCardContainer, CardTitle } from "./styled";
import { ITasklistDetails } from "interfaces";

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
    <TasklistCardContainer>
      <CardTitle>
        <input
          onChange={(e) => {
            setTasklist((prevState) => ({
              ...prevState,
              name: e.target.value,
            }));
          }}
          value={tasklist.name}
          type="text"
          placeholder="Input tasklist name"
        />
        <button onClick={handleCreate}>Add Tasklist</button>
      </CardTitle>
    </TasklistCardContainer>
  );
};
