import {useEffect, useState} from "react";
import {IProjectDetails} from "interfaces";
import dummyProjects from "../../../../dummydata/dummy";
import {DropResult, ResponderProvided} from "react-beautiful-dnd";

export const useGetProjects = () => {
    const [projects, setProjects] = useState<IProjectDetails[]>([]);
    const retrieveProjects = async () => {
        //TODO get only user projects
        // const projectsResponse = await ProjectService.getProjects();
        await setTimeout(() => {
            setProjects(dummyProjects)
        }, 0)
    };

    const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
        const {source, destination} = result;
        if(source.index === destination?.index){
            return;
        }
        setProjects(oldProj => oldProj.map((e, i) => {
            if (i === source.index){
                return oldProj[destination?.index || 0];
            }
            if (i === destination?.index){
                return oldProj[source?.index || 0];
            }
            return e
        }))

    }
    useEffect(() => {
        retrieveProjects().catch(console.log);
    }, []);

    return {projects, retrieveProjects, onDragEnd}
}
