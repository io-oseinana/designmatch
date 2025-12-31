'use client'
import React from 'react'
import useProject from "@/context/useProject";
import ProjectCard from "@/components/project-card";

export default function ProjectContainer() {
    const {projects, isLoading} = useProject();

    return (
        <section
            className={`flex flex-1 w-full h-full bg-cover bg-center bg-[#f2f1f4] dark:bg-black rounded-2xl p-4`}>
            {isLoading ? (
                <div className="flex items-center justify-center gap-2 w-full text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
                         className="icon icon-tabler icons-tabler-outline icon-tabler-loader animate-spin text-xs">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12 6l0 -3"/>
                        <path d="M16.25 7.75l2.15 -2.15"/>
                        <path d="M18 12l3 0"/>
                        <path d="M16.25 16.25l2.15 2.15"/>
                        <path d="M12 18l0 3"/>
                        <path d="M7.75 16.25l-2.15 2.15"/>
                        <path d="M6 12l-3 0"/>
                        <path d="M7.75 7.75l-2.15 -2.15"/>
                    </svg>
                    <span className="text-xs">Loading...</span>
                </div>
            ) : projects.length === 0 ? (
                <div className="flex flex-col w-full items-center justify-center text-center text-gray-500">
                    <h2 className="text-2xl font-semibold mb-4">No Projects Found</h2>
                    <p className="text-gray-400">Start by creating a new project to compare your designs
                        side-by-side.</p>
                </div>
            ) : (
                <div className="flex flex-wrap gap-4 overflow-y-auto w-full h-full pr-2">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project}/>
                    ))}
                </div>
            )}
        </section>
    )
}
