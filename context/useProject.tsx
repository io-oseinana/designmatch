'use client'
import React, {createContext, useCallback, useContext, useEffect, useState} from "react";
import {Project, useProjectDB} from "@/hooks/useProjectDB";

interface ProjectContextType {
    projects: Project[];
    getAllProjects: () => Promise<Project[]>;
    saveProject: (project: Project) => Promise<void>;
    deleteProject: (id: string) => Promise<void>;
    isLoading: boolean;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({children}: { children: React.ReactNode }) {
    const {getAllProjects, saveProject, deleteProject, loading} = useProjectDB();
    const [projects, setProjects] = useState<Project[]>([]);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        if (loading) return;
       const fetchProjects = async () => {
           const data = await getAllProjects();
           setProjects(data);
           setIsFetching(false);
       };
       fetchProjects()
    }, [getAllProjects, loading]);

    const saveProjectContext = useCallback(async (project: Project) => {
        await saveProject(project);
        setProjects((prev) => [...prev, project]);
    }, [saveProject]);

    const deleteProjectContext = useCallback(async (id: string) => {
        await deleteProject(id);
        setProjects((prev) => prev.filter((project) => project.id !== id));
    }, [deleteProject]);

    const value = {
        projects,
        getAllProjects,
        saveProject: saveProjectContext,
        deleteProject: deleteProjectContext,
        isLoading: loading || isFetching,
    };


    return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}

export default function useProject() {
    const context = useContext(ProjectContext);
    if (context === undefined) {
        throw new Error("useProject must be used within a ProjectProvider");
    }
    return context;
}