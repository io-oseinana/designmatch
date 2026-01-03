import ProjectContainer from "@/components/project-container";
import ProjectForm from "@/components/project-form";
import ProjectLayout from "@/app/(projects)/layoutt";

export default function Page() {
    return (
        <ProjectLayout>
            <ProjectForm/>
            <ProjectContainer/>
        </ProjectLayout>
    );
}
