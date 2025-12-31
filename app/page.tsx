import Navbar from "@/components/navbar";
import ProjectContainer from "@/components/project-container";
import ProjectForm from "@/components/project-form";
import {ProjectProvider} from "@/context/useProject";

export default function Page() {
    return (
        <ProjectProvider>
            <main className="flex min-h-screen flex-col justify-between px-4 md:px-8 py-4">
                <Navbar/>
                <ProjectForm/>
                <ProjectContainer/>
            </main>
        </ProjectProvider>
    );
}
