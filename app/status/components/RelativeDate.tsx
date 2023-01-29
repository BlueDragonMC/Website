"use client";

export default function RelativeDate() {
    return (
        <span>
            {new Intl.DateTimeFormat(undefined, {
                dateStyle: "short",
                timeStyle: "short",
            }).format()}
        </span>
    );
}
