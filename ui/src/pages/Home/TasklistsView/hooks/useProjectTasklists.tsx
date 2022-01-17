import {useEffect, useState} from "react";
import {IProjectDetails, ITaskDetails} from "interfaces";
import dummyProjects from "dummydata/dummy";
import {DropResult, ResponderProvided} from "react-beautiful-dnd";

export const useProjectTasklists = () => {
    const [project, setProject] = useState<IProjectDetails>();
    const retrieveTasklists = async () => {
        //TODO get only user projects
        // const projectsResponse = await ProjectService.getProjects();
          setTimeout(() => {
            setProject(dummyProjects[0])
        }, 30)
    };

    useEffect(() => {
        retrieveTasklists().catch(console.log);
    }, []);

    return {project, setProject}
}
