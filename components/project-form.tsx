'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import Image from "next/image";
import useProject from "@/context/useProject";
import {Project as ProjectType} from "@/hooks/useProjectDB";

export default function ProjectForm() {
    const {saveProject} = useProject();
    const [open, setOpen] = useState(false);
    const [images, setImages] = useState<{
        desktop: string | null;
        tablet?: string | null;
        mobile?: string | null;
    }>({
        desktop: null,
        tablet: null,
        mobile: null,
    });
    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>, breakpoint: 'desktop' | 'tablet' | 'mobile') => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImages(prev => ({...prev, [breakpoint]: reader.result as string}));
            }
            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const url = formData.get('url') as string;

        if (!name || !url) return;

        const newProject: ProjectType = {
            id: crypto.randomUUID(),
            name,
            description,
            images: [images.desktop, images.tablet, images.mobile].filter((img): img is string => !!img),
            url
        };
        await saveProject(newProject);
        setOpen(false);
        setImages({desktop: null, tablet: null, mobile: null});
    }
    const uploadFields = [
        {
            key: 'desktop',
            label: 'Desktop',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="#ffffff"
                       className="icon icon-tabler icons-tabler-filled icon-tabler-device-imac">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path
                    d="M8 22a1 1 0 0 1 0 -2h.616l.25 -2h-4.866a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h16a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-4.867l.25 2h.617a1 1 0 0 1 0 2zm5.116 -4h-2.233l-.25 2h2.733z"/>
            </svg>
        },
        {
            key: 'tablet',
            label: 'Tablet',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="#ffffff"
                       className="icon icon-tabler icons-tabler-filled icon-tabler-device-ipad">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path
                    d="M18 2a3 3 0 0 1 3 3v14a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-14a3 3 0 0 1 3 -3zm-3 16h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0 -2"/>
            </svg>
        },
        {
            key: 'mobile',
            label: 'Mobile',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="#ffffff"
                       className="icon icon-tabler icons-tabler-filled icon-tabler-device-tablet">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path
                    d="M18 2a2 2 0 0 1 1.995 1.85l.005 .15v16a2 2 0 0 1 -1.85 1.995l-.15 .005h-12a2 2 0 0 1 -1.995 -1.85l-.005 -.15v-16a2 2 0 0 1 1.85 -1.995l.15 -.005h12zm-6 13a2 2 0 0 0 -1.977 1.697l-.018 .154l-.005 .149l.005 .15a2 2 0 1 0 1.995 -2.15z"/>
            </svg>
        }
    ] as const;

    return (
        <section>
            <div className="py-4">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger
                        className="bg-primary flex items-center justify-center text-background px-4 py-2 rounded-md gap-2 hover:opacity-90 transition-opacity">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14 0C16.2091 0 18 1.79086 18 4V14C18 16.2091 16.2091 18 14 18H4C1.79086 18 1.61066e-08 16.2091 0 14V4C0 1.79086 1.79086 1.61064e-08 4 0H14ZM8.5 4V8.5H4V9.5H8.5V14H9.5V9.5H14V8.5H9.5V4H8.5Z"
                                fill="white"/>
                        </svg>
                        Create New Project
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>New Project</DialogTitle>
                            <DialogDescription>
                                Provide the necessary details of the project below.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col justify-center gap-4">
                            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 my-4">
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <Label>Upload Design Image <span className="text-red-500">*</span></Label>
                                    </div>
                                    <div
                                        className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex gap-2 items-center justify-center p-2">
                                        {uploadFields.map((field) => (
                                            <div key={field.key}
                                                 className="relative bg-[#dfdfdf] h-full overflow-hidden rounded-md group">
                                                {images[field.key as keyof typeof images] ? (
                                                    <Image src={images[field.key as keyof typeof images]!}
                                                           alt={`${field.label} Preview`} width="140" height="170"
                                                           className="w-full h-full object-contain rounded-md absolute"/>
                                                ) : (
                                                    <div
                                                        className="absolute flex flex-col items-center justify-center bg-[#dfdfdf] w-full h-full rounded-md">
                                                        {field.icon}
                                                        <span className="text-xs">{field.label}</span>
                                                    </div>
                                                )}
                                                <Input title={field.label}
                                                       type="file"
                                                       accept="image/*"
                                                       onChange={(e) => handleUpload(e, field.key as any)}
                                                       className="w-full h-full opacity-0 cursor-pointer  inset-0 z-10"/>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex flex-col space-y-4 my-4">
                                        <Label htmlFor="name">ProjectForm Name <span
                                            className="text-red-500">*</span></Label>
                                        <Input id="name" name="name" placeholder="Signup UI" required/>
                                    </div>
                                    <div className="flex flex-col space-y-4 ">
                                        <Label htmlFor="description">ProjectForm Description</Label>
                                        <Textarea id="description" name="description"
                                                  placeholder="Signup UI design component"/>
                                    </div>
                                    <div className="flex flex-col space-y-4 my-4">
                                        <Label htmlFor="url">Live Link or Port<span
                                            className="text-red-500">*</span></Label>
                                        <Input id="url" name="url"
                                               placeholder="3000 or https://username.github.io/signup-ui" required/>
                                    </div>
                                </div>

                                <div className="flex justify-end mt-4">
                                    <Button type="submit" aria-label="Save ProjectForm">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M13 16C13.7354 16 14.1863 16.002 14.5127 16.0459C14.8103 16.0859 14.8506 16.1436 14.8535 16.1465C14.8564 16.1494 14.9141 16.1897 14.9541 16.4873C14.998 16.8137 15 17.2646 15 18V21H9C8.64496 21 8.31221 20.9988 8 20.9971V18C8 17.2646 8.00202 16.8137 8.0459 16.4873C8.08591 16.1897 8.14358 16.1494 8.14648 16.1465C8.14939 16.1436 8.18974 16.0859 8.4873 16.0459C8.81365 16.002 9.26462 16 10 16H13ZM15.3428 3C16.16 3 16.5691 3.00023 16.9365 3.15234C17.3041 3.30458 17.5938 3.59381 18.1719 4.17188L19.8281 5.82812C20.4062 6.40618 20.6954 6.69593 20.8477 7.06348C20.9998 7.43094 21 7.83996 21 8.65723V15C21 17.8284 20.9998 19.2424 20.1211 20.1211C19.4798 20.7624 18.5534 20.9346 17 20.9814V18C17 17.3212 17.0025 16.7113 16.9365 16.2207C16.8667 15.7014 16.704 15.1688 16.2676 14.7324C15.8312 14.296 15.2986 14.1333 14.7793 14.0635C14.2887 13.9975 13.6788 14 13 14H10C9.32116 14 8.7113 13.9975 8.2207 14.0635C7.70137 14.1333 7.16884 14.296 6.73242 14.7324C6.29601 15.1688 6.13331 15.7014 6.06348 16.2207C5.99752 16.7113 6 17.3212 6 18V20.9229C5.02497 20.8269 4.36878 20.611 3.87891 20.1211C3.00023 19.2424 3 17.8284 3 15V9C3 6.17157 3.00023 4.75759 3.87891 3.87891C4.75759 3.00023 6.17157 3 9 3H15.3428ZM7 7C6.44772 7 6 7.44772 6 8C6 8.55228 6.44772 9 7 9H12C12.5523 9 13 8.55228 13 8C13 7.44772 12.5523 7 12 7H7Z"
                                                fill="white"/>
                                        </svg>
                                        Save Project
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </section>
    )
}