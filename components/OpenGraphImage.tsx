import { BASE_PATH } from "@/app/vars";

export default function OpenGraphImage({ relative }: { relative: string }) {
    return (
        <>
            <meta name="og:image" key="image" content={BASE_PATH + relative} />
            {relative.includes("/api/og") ? <meta name="twitter:card" content="summary_large_image" /> : <></>}
        </>
    )
}