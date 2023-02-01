import { PropsWithChildren } from "react";

type StepProps = PropsWithChildren<{
    number: number;
}>;

export default function Step({ number, children }: StepProps) {
    return (
        <div className="my-4">
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-700 align-middle text-white">
                {number}
            </div>
            <span className="ml-3">{children}</span>
        </div>
    );
}
