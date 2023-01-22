import { BASE_PATH } from "@/app/vars";

export default function OpenGraphImage({ relative }: { relative: string}) {

    return (
        <meta name="og:image" content={BASE_PATH + relative} />
    )
}