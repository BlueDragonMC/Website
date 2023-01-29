"use client";

export default function RelativeDate({
    date,
    text,
}: {
    date: Date;
    text: string;
}) {
    const format = new Intl.DateTimeFormat(undefined, {
        dateStyle: "long",
        timeStyle: "long",
    });

    return <span title={date ? format.format(date) : "Unknown"}>{text}</span>;
}
