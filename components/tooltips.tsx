import {Button} from "@/components/ui/button"
import {Tooltip, TooltipContent, TooltipTrigger,} from "@/components/ui/tooltip"
import React from "react";

export function Tooltips({node, description, onClick, isActive}: {
    node: React.ReactNode;
    description: string,
    onClick?: () => void;
    isActive?: boolean
}) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="outline"
                    onClick={onClick}
                    className={isActive ? "border-2 border-[#36d387] dark:border-[#36d387]" : ""}
                >
                    {node}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>{description}</p>
            </TooltipContent>
        </Tooltip>
    )
}
