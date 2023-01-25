import Step from "@/components/Step";

export default function Loading() {
    return (
        <main>
            <span className="block h-9 mb-2 w-72 animate-pulse bg-neutral-600 mx-auto"></span>
            <span
                className="block h-7 mb-2 w-24 animate-pulse bg-neutral-600 mx-auto"
                style={{ animationDelay: "0.05s" }}
            ></span>
            <div className="w-max mx-auto">
                {Array.from({ length: 10 }, (_, i) => (
                    <Step key={i} number={i + 1}>
                        <div className="inline-flex justify-between w-72 md:w-96">
                            <span
                                className="inline-block h-5 w-48 animate-pulse bg-neutral-600"
                                style={{ animationDelay: `${i * 0.1}s` }}
                            ></span>
                            <span
                                className="inline-block h-5 w-20 animate-pulse bg-neutral-600"
                                style={{ animationDelay: `${i * 0.1 + 0.05}s` }}
                            ></span>
                        </div>
                    </Step>
                ))}
            </div>
        </main>
    );
}
