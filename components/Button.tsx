import Link from "next/link";
import { ReactElement } from "react";

export const Button = ({
    icon,
    href,
    text,
    intent = "primary",
}: {
    icon?: ReactElement;
    href: string;
    text: string;
    intent?: "primary" | "secondary";
}) => {
    const classes =
        intent === "primary"
            ? "bg-blue-700 hover:bg-blue-800 focus:bg-blue-900"
            : "bg-gray-500 hover:bg-gray-600 focus:bg-gray-700";

    return (
        <Link href={href}>
            <button
                className={`mt-2 mr-2 rounded-md px-4 py-2 text-white ${classes}`}
            >
                {icon && (
                    <span className="fill-black dark:fill-white">{icon}</span>
                )}
                <span className="ml-2 align-middle font-medium">{text}</span>
            </button>
        </Link>
    );
};
