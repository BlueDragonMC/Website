import { config, IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { PropsWithoutRef, SVGProps } from "react";
import styles from "./icon.module.css";

config.autoAddCss = false;

/**
 * A lightweight alternative to FontAwesome's
 * [react-fontawesome](https://github.com/FortAwesome/react-fontawesome)
 * library which doesn't magically add styles to the head after the page loads.
 */
export default function FontAwesomeIcon(
    props: {
        icon: IconDefinition;
    } & PropsWithoutRef<SVGProps<SVGElement>>
) {
    const { icon, ...extraProps } = props;
    const [width, height, _ligatures, _unicode, pathString] = icon.icon;

    const paths = Array.isArray(pathString) ? pathString : [pathString];

    return (
        <svg
            aria-hidden="true"
            focusable="false"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${width} ${height}`}
            {...extraProps}
            className={`${styles.icon} ${extraProps.className}`}
        >
            {paths.map((path) => (
                <path key={path} fill="currentColor" d={path} />
            ))}
        </svg>
    );
}
