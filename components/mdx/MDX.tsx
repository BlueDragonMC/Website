import ServerImage from "@/app/blog/[post]/components/ServerImage";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faClock, faPencil, faUser } from "@fortawesome/free-solid-svg-icons";
import { readdir, readFile } from "fs/promises";
import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import { join } from "path";
import { ComponentPropsWithoutRef, Fragment } from "react";
import remarkGfm from "remark-gfm";
import FontAwesomeIcon from "../FontAwesomeIcon";
import Gallery from "../Gallery";
import styles from "./mdx.module.css";

let header: React.ReactElement[] = [];

const components = {
    img: ServerImage,
    a: Link,
    tr: (props: ComponentPropsWithoutRef<"tr">) => {
        const children = props.children as React.ReactElement[];
        if (children[0]?.type == "th") {
            header = children;
            return <tr className="hidden md:table-row">{props.children}</tr>;
        } else {
            return (
                <tr className={`${styles.row} grid grid-cols-2 md:table-row`}>
                    {children.map((td, i) => {
                        return (
                            <Fragment key={i}>
                                <td
                                    className="table-cell pl-0 font-bold md:hidden"
                                    aria-hidden="true"
                                >
                                    {header[i].props.children}
                                </td>
                                <td className={i == 0 ? "md:pl-0" : ""}>
                                    {td.props.children}
                                </td>
                            </Fragment>
                        );
                    })}
                </tr>
            );
        }
    },
};

export default async function MDX({
    dirName,
    slug,
}: {
    dirName: string;
    slug: string;
}) {
    const dir = join(process.cwd(), dirName);
    const p = (await readdir(dir)).find(
        (entry) => entry.substring(0, entry.lastIndexOf(".")) == slug
    );
    if (!p) {
        notFound();
    }
    const source = (await readFile(join(process.cwd(), dirName, p))).toString();
    const { content, frontmatter } = await compileMDX({
        source: source,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [remarkGfm],
            },
        },
        /* @ts-expect-error Types don't match because one of the components is a Server Component, so it's an async function. */
        components: components,
    });

    const fmt = new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
    });

    const created = frontmatter?.created
        ? fmt.format(new Date(frontmatter?.created))
        : undefined;
    const modified = frontmatter?.modified
        ? fmt.format(new Date(frontmatter?.modified))
        : undefined;

    return (
        <Gallery>
            <h1 className="mb-0">{frontmatter?.title}</h1>
            <p className="mt-2">
                {frontmatter?.author && (
                    <Icon
                        icon={faUser}
                        text={"Posted by: " + frontmatter?.author}
                    />
                )}
                {created && (
                    <Icon icon={faClock} text={"Created: " + created} />
                )}
                {modified && created !== modified && (
                    <Icon icon={faPencil} text={"Last Modified: " + modified} />
                )}
            </p>
            {content}
        </Gallery>
    );
}

const Icon = ({
    icon,
    text,
}: {
    icon: IconDefinition;
    text: string | undefined;
}) => {
    if (!text) {
        return <></>;
    }
    return (
        <span className="mr-4 whitespace-nowrap">
            <FontAwesomeIcon icon={icon} className="mr-2" />
            {text}
        </span>
    );
};
