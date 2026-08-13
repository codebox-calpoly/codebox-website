import type { ReactNode } from "react";

import { SlideInButton } from "./SlideInButton";

type PillButtonProps = {
    href: string;
    children: ReactNode;
    variant?: "primary" | "outline";
    size?: "sm" | "md" | "lg";
    /** Kept for call-site compatibility; the arrow now slides in on hover. */
    showArrow?: boolean;
    className?: string;
    newTab?: boolean;
    onClick?: () => void;
};

const sizeMap = { sm: "small", md: "medium", lg: "large" } as const;

export function PillButton({
    href,
    children,
    variant = "outline",
    size = "md",
    className,
    newTab = false,
    onClick,
}: PillButtonProps) {
    const colorProps =
        variant === "primary"
            ? {
                  defaultBackgroundColor: "#1a9b4a",
                  hoverBackgroundColor: "#005e2f",
                  defaultTextColor: "#ffffff",
                  hoverTextColor: "#ffffff",
              }
            : {
                  defaultBackgroundColor: "transparent",
                  hoverBackgroundColor: "#1a9b4a",
                  defaultTextColor: "#ffffff",
                  hoverTextColor: "#ffffff",
                  borderColor: "rgba(255,255,255,0.4)",
                  hoverBorderColor: "#1a9b4a",
              };

    return (
        <SlideInButton
            link={href}
            newTab={newTab}
            variant={sizeMap[size]}
            buttonText={children}
            onClick={onClick}
            className={className}
            iconName="ArrowRight"
            {...colorProps}
        />
    );
}
