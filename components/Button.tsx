import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import { ReactElement } from "react";
import FontAwesomeIcon from "./FontAwesomeIcon";

export const Button = ({
    icon,
    href,
    text,
    intent = "primary",
    iconPosition = "left",
}: {
    icon?: ReactElement | IconDefinition;
    href: string;
    text: string;
    intent?: "primary" | "secondary";
    iconPosition?: "left" | "right";
}) => {
    const classes =
        intent === "primary"
            ? "bg-blue-700 hover:bg-blue-800 focus:bg-blue-900"
            : "bg-gray-500 hover:bg-gray-600 focus:bg-gray-700";

    const iconElement =
        icon !== undefined && "icon" in icon ? (
            <FontAwesomeIcon icon={icon} className="align-middle" />
        ) : (
            icon
        );

    return (
        <Link href={href}>
            <button
                className={`mt-2 mr-2 inline-flex gap-2 rounded-md px-4 py-2 text-white ${classes} ${
                    iconPosition === "right" && "flex-row-reverse"
                }`}
            >
                {icon && (
                    <span className="fill-black dark:fill-white">
                        {iconElement}
                    </span>
                )}
                <span className="align-middle font-medium">{text}</span>
            </button>
        </Link>
    );
};
