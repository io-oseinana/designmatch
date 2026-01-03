'use client';

import {useParams} from 'next/navigation';
import useProject from '@/context/useProject';
import React from 'react';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import ProjectLayout from "@/app/(projects)/layoutt";
import {capitalizeFirstLetter} from "@/components/project-card";
import Comparator from "@/components/comparator";

export default function ProjectPage() {
    const params = useParams();
    const {projects, isLoading} = useProject();

    // Get the projectUrl from the route parameters
    const projectUrl = params?.projectUrl as string;

    const project = projects.find((p) => p.projectUrl === projectUrl);


    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center gap-2">
                <span className="animate-spin">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
                         className="icon icon-tabler icons-tabler-outline icon-tabler-loader text-xs">
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
                </span> Loading Project...
            </div>
        );
    }

    if (!project) {
        return (
            <div className="flex h-screen flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-bold">Project Not Found</h1>
                <p className="text-gray-500">The project you are looking for does not exist.</p>
                <Link href="/">
                    <Button>Back to Home</Button>
                </Link>
            </div>
        );
    }

    return (
        <ProjectLayout>
            <div className="flex justify-between my-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">{capitalizeFirstLetter(project.name)}</h1>
                    {project.description &&
                        <p className="text-gray-500 mb-8">{capitalizeFirstLetter(project.description)}</p>}
                </div>
                <Link href="/">
                    <Button variant="outline" size="sm">← Back to Projects</Button>
                </Link>
            </div>


            <Comparator project={project}/>
        </ProjectLayout>
    );
}
