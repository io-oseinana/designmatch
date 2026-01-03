import {Project} from "@/hooks/useProjectDB";
import Image from "next/image";
import React from "react";
import {Tooltips} from "@/components/tooltips";
import {cn} from "@/lib/utils";

export default function Comparator({project}: { project: Project }) {
    const previewImage = project?.images.find((img) => img.breakpoint === 'desktop')?.data || project?.images[0]?.data;
    const [viewMode, setViewMode] = React.useState<'component' | 'fullpage'>('component');
    const [comparisonMode, setComparisonMode] = React.useState<'desktop' | 'tablet' | 'mobile'>('desktop');

    const desktopComparison = () => {
        setComparisonMode('desktop')
    }

    const tabletComparison = () => {
        setComparisonMode('tablet')
    }

    const mobileComparison = () => {
        setComparisonMode('mobile')
    }

    const tooltipsFields = [
        {
            key: 'desktop',
            label: 'Desktop',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="currentColor"
                       className="icon icon-tabler icons-tabler-filled icon-tabler-device-imac text-black dark:text-white">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path
                    d="M8 22a1 1 0 0 1 0 -2h.616l.25 -2h-4.866a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h16a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-4.867l.25 2h.617a1 1 0 0 1 0 2zm5.116 -4h-2.233l-.25 2h2.733z"/>
            </svg>,
            description: "Desktop Comparison",
            onClick: desktopComparison
        },
        {
            key: 'tablet',
            label: 'Tablet',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="currentColor"
                       className="icon icon-tabler icons-tabler-filled icon-tabler-device-ipad text-black dark:text-white">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path
                    d="M18 2a3 3 0 0 1 3 3v14a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-14a3 3 0 0 1 3 -3zm-3 16h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0 -2"/>
            </svg>,
            description: "Tablet Comparison",
            onClick: tabletComparison
        },
        {
            key: 'mobile',
            label: 'Mobile',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="currentColor"
                       className="icon icon-tabler icons-tabler-filled icon-tabler-device-tablet text-black dark:text-white">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path
                    d="M18 2a2 2 0 0 1 1.995 1.85l.005 .15v16a2 2 0 0 1 -1.85 1.995l-.15 .005h-12a2 2 0 0 1 -1.995 -1.85l-.005 -.15v-16a2 2 0 0 1 1.85 -1.995l.15 -.005h12zm-6 13a2 2 0 0 0 -1.977 1.697l-.018 .154l-.005 .149l.005 .15a2 2 0 1 0 1.995 -2.15z"/>
            </svg>,
            description: "Mobile Comparison",
            onClick: mobileComparison
        }
    ] as const;

    const componentMode = () => {
        setViewMode('component')
    }

    const fullpageMode = () => {
        setViewMode('fullpage')
    }

    return (
        <>
            <div className="sticky top-0 z-50 flex justify-between items-center mb-4">
                <div className="">
                    <span>Design vs Built</span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                        <Tooltips
                            node={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                       fill="currentColor" stroke="#ffffff" stroke-width="2" stroke-linecap="round"
                                       stroke-linejoin="round"
                                       className="icon icon-tabler icons-tabler-outline icon-tabler-arrows-maximize text-black dark:text-white">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M16 4l4 0l0 4"/>
                                <path d="M14 10l6 -6"/>
                                <path d="M8 20l-4 0l0 -4"/>
                                <path d="M4 20l6 -6"/>
                                <path d="M16 20l4 0l0 -4"/>
                                <path d="M14 14l6 6"/>
                                <path d="M8 4l-4 0l0 4"/>
                                <path d="M4 4l6 6"/>
                            </svg>}
                            description="Fullpage Comparison"
                            onClick={fullpageMode}
                            isActive={viewMode === 'fullpage'}
                        />
                        <Tooltips
                            node={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                       fill="currentColor" stroke="#ffffff" stroke-width="2" stroke-linecap="round"
                                       stroke-linejoin="round"
                                       className="icon icon-tabler icons-tabler-outline icon-tabler-arrows-minimize text-black dark:text-white">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M5 9l4 0l0 -4"/>
                                <path d="M3 3l6 6"/>
                                <path d="M5 15l4 0l0 4"/>
                                <path d="M3 21l6 -6"/>
                                <path d="M19 9l-4 0l0 -4"/>
                                <path d="M15 9l6 -6"/>
                                <path d="M19 15l-4 0l0 4"/>
                                <path d="M15 15l6 6"/>
                            </svg>}
                            description="Component Comparison"
                            onClick={componentMode}
                            isActive={viewMode === 'component'}

                        />
                    </div>
                    <div className="flex gap-2">
                        {tooltipsFields.map(field => (
                            <Tooltips
                                key={field.key}
                                node={field.icon}
                                description={field.description}
                                onClick={field.onClick}
                                isActive={comparisonMode === field.key}
                            />
                        ))}
                    </div>
                </div>

            </div>
            <section
                className={cn(
                    "flex flex-col max-w-[1440px]  bg-cover bg-center border border-[#36d387] p-2 rounded-sm animate-in fade-in zoom-in-95 duration-500 transition-all",
                    viewMode === 'component'
                        ? "h-full overflow-hidden"
                        : "w-full h-auto min-h-[80vh] overflow-visible"
                )}>
                <div className="flex-1">
                    <div className={cn(
                        "w-full overflow-auto relative mx-auto",
                        viewMode === 'component'
                            ? "aspect-[5/3]"
                            : "h-auto",
                        comparisonMode === 'desktop'
                            ? "max-w-[1440px]"
                            : comparisonMode === 'tablet'
                                ? "max-w-[768px]"
                                : comparisonMode === 'mobile'
                                    ? "max-w-[375px]"
                                    : ""
                    )}>
                        {/*{project.screenshots.map(screenshot => (*/}
                        {/*    screenshot.breakpoint === comparisonMode && (*/}
                        {/*        <div key={screenshot.breakpoint}*/}
                        {/*                className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs font-medium z-10 pointer-events-none backdrop-blur-sm">*/}
                        {/*            {screenshot.breakpoint.charAt(0).toUpperCase() + screenshot.breakpoint.slice(1)} View*/}
                        {/*            <Image width={0} height={0} src={screenshot.data} alt={screenshot.breakpoint} className="w-full h-full" />*/}
                        {/*        </div>*/}
                        {/*    */}
                        {/*    */}
                        {/*)    ))}*/}
                        <DesignBuiltComparator project={project} mode={comparisonMode}/>
                    </div>
                </div>
            </section>
        </>
    )
}

export function DesignBuiltComparator({project, mode}: { project: Project, mode: 'desktop' | 'tablet' | 'mobile' }) {
    const designImage = project.images.find((img) => img.breakpoint === mode)?.data;
    const builtImage = project.screenshots.find((img) => img.breakpoint === mode)?.data;
    const [sliderPosition, setSliderPosition] = React.useState(50);

    if (!designImage && !builtImage) {
        return (
            <div
                className="flex h-full min-h-[300px] items-center justify-center p-8 text-muted-foreground bg-white/50 dark:bg-black/50 rounded-lg">
                No images available for {mode} mode.
            </div>
        )
    }

    if (!designImage || !builtImage) {
        const imageToShow = designImage || builtImage;
        const label = designImage ? "Design" : "Built";

        return (
            <div className="relative w-full h-auto">
                <Image
                    src={imageToShow!}
                    alt={`${mode} preview`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-auto"
                />
                <div
                    className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs font-medium z-10 pointer-events-none backdrop-blur-sm">
                    {label} Only
                </div>
            </div>
        )
    }
    return (
        <div className="relative w-full h-auto group select-none overflow-hidden shadow-sm">
            {/* Built Image (Background) - Absolute */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={builtImage}
                    alt="Built"
                    fill
                    className="object-cover object-top"
                />
            </div>

            {/*Design Image (Foreground) - Clipped*/}
            <div className="relative w-full h-auto" style={{clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`}}>
                <Image
                    src={designImage}
                    alt="Design"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-auto block"
                />
            </div>

            {/* Slider Handle */}
            <div
                className="absolute inset-y-0 w-1 bg-white cursor-ew-resize z-10 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                style={{left: `${sliderPosition}%`}}>

                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                         className="text-gray-600">
                        <path d="M18 8L22 12L18 16"/>
                        <path d="M6 8L2 12L6 16"/>
                    </svg>
                </div>
            </div>

            {/* Range Input for Interaction */}
            <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
            />

            {/* Labels */}
            <div
                className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs font-medium z-10 pointer-events-none backdrop-blur-sm">
                Design
            </div>
            <div
                className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs font-medium z-10 pointer-events-none backdrop-blur-sm">
                Built
            </div>
        </div>
    )
}