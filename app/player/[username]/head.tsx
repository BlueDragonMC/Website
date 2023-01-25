import ParentHead from "@/app/head";
import { BASE_PATH } from "@/app/vars";
import BaseHead from "@/components/BaseHead";
import { PlayerResponse } from "@/pages/api/player";

export default async function Head({ params: { username } }: { params: { username: string } }) {
    const res = await fetch(`${BASE_PATH}/api/player?username=${encodeURIComponent(username)}`);

    if (!res.ok) {
        return <ParentHead />
    }

    const info = await res.json() as PlayerResponse;
    const nonDashedUUID = info.uuid.replaceAll(/-/g, "");

    return <>
        <BaseHead image={`/api/og?title=${encodeURIComponent(info.username)}&ogPreview=${encodeURIComponent(`View ${info.username}'s BlueDragon profile and statistics online.`)}&player=${encodeURIComponent(nonDashedUUID)}`} />

        <title>{`${info.username}'s stats | BlueDragon`}</title>

        <meta name="og:title" content={`${info.username}'s stats | BlueDragon`} />
        <meta name="og:description" content={`View ${info.username}'s BlueDragon profile and statistics online.`} />
        <meta name="og:type" content="profile" />
        <meta name="og:profile:username" content={info.username} />
    </>
}