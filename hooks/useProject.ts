import {useCallback, useEffect, useState} from "react";
import {Project, useProjectDB} from "@/hooks/useProjectDB";

function useProject() {
    const {getAllProjects, saveProject, deleteProject, loading} = useProjectDB();
    const [projects, setProjects] = useState<Project[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(true);

    useEffect(() => {
        if (loading) return;
        let cancelled = false;
        (async () => {
            const projects = await getAllProjects();
            if (!cancelled) {
                setProjects(projects);
                setIsFetching(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [getAllProjects, loading]);



    const deleteAProject = useCallback(async (id: string) => {
        await deleteProject(id)
        const updatedProjects = await getAllProjects();
        setProjects(updatedProjects);
    }, [deleteProject, getAllProjects]);

    return {
        projects,
        getAllProjects,
        saveProject,
        deleteProject: deleteAProject,
        isLoading: loading || isFetching,
    };
}

export default useProject;