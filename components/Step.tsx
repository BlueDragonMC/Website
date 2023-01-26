import { PropsWithChildren } from "react";

type StepProps = PropsWithChildren<{
    number: number;
}>;

export default function Step({ number, children }: StepProps) {
    return (
        <div className="my-4">
            <div className="inline-flex align-middle justify-center items-center bg-blue-700 text-white rounded-full w-8 h-8">
                {number}
            </div>
            <span className="ml-3">{children}</span>
        </div>
    );
}
