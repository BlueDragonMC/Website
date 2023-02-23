"use client";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FontAwesomeIcon from "./FontAwesomeIcon";

export interface NavItemProps {
    text: string;
    href: string;
    active?: boolean;
    color?: string;
    activeColor?: string;
    icon?: IconDefinition;
}

export default function NavItem({
    text,
    href,
    active,
    color,
    activeColor,
    icon,
}: NavItemProps) {
    const path = usePathname();
    const isActive =
        active || path === href || (href !== "/" && path?.startsWith(href));
    const activeColorClasses =
        activeColor ?? "bg-slate-500 font-bold hover:bg-slate-400";
    const inactiveColorClasses = color ?? "hover:bg-slate-600";

    return (
        <Link
            href={href}
            className={`${
                isActive ? activeColorClasses : inactiveColorClasses
            } rounded-md p-2 text-base font-medium text-white transition-colors`}
        >
            <span className="hidden md:inline" id={`header-nav-item-${text}`}>
                {text}
            </span>
            <span
                className="md:hidden"
                aria-labelledby={`header-nav-item-${text}`}
            >
                {icon && <FontAwesomeIcon icon={icon} />}
            </span>
        </Link>
    );
}
