import React from 'react'
import {Project} from "@/hooks/useProjectDB";
import useProject from "@/context/useProject";
import Image from "next/image";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"

const ProjectCard = ({project}: { project: Project }) => {
    const {deleteProject} = useProject();

    return (
        <div className="relative bg-white/80 backdrop-blur-sm shadow-sm p-2 rounded-lg w-[290px] h-auto">
            <div className="w-full h-auto md:h-[178px] overflow-hidden mb-2">
                <Image width={274} height={178} src={project.images[0]} alt={project.name}
                       className="w-full h-full object-fill mb-2 rounded"/>
            </div>
            <h3 className="text-xl font-semibold">{project.name}</h3>
            {project.description && <p className="text-gray-500 text-xs mb-4">{project.description}</p>}

            <DropdownMenu>
                <DropdownMenuTrigger asChild
                                     className="absolute bottom-2 right-2 rounded-full hover:bg-white cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                         fill="none"
                         stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
                         className="icon icon-tabler icons-tabler-outline icon-tabler-dots-vertical size-4">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/>
                        <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/>
                        <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/>
                    </svg>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full" align="end">
                    <DropdownMenuItem variant="destructive" onClick={() => deleteProject(project.id)}>
                        <button className="flex gap-2 text-xs" aria-label="Delete ProjectForm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="currentColor"
                                 className="icon icon-tabler icons-tabler-filled icon-tabler-trash size-4 text-red-400">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path
                                    d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z"/>
                                <path
                                    d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z"/>
                            </svg>
                            Delete
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
export default ProjectCard
