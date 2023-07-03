import Step from "@/components/Step";
import Link from "next/link";

export default function Page() {
    const emphasis = "text-green-500 dark:text-amber-500 font-bold";

    return (
        <main>
            <h1 className="text-3xl font-bold">How To Join</h1>
            <ul>
                <Step number={1}>
                    Launch Minecraft 1.20.1{" "}
                    <em>(This is the only version that BlueDragon supports)</em>
                </Step>
                <Step number={2}>
                    Click <span className={emphasis}>Multiplayer</span>, then{" "}
                    <span className={emphasis}>Add Server</span>.
                </Step>
                <Step number={3}>
                    Enter <code>bluedragonmc.com</code> in the{" "}
                    <span className={emphasis}>Server Address</span> box and
                    click <span className={emphasis}>Done</span>.
                </Step>
                <Step number={4}>
                    Double click on the server you just added.{" "}
                    <span className="font-medium text-green-500">
                        That&apos;s it! 🎉
                    </span>
                </Step>
                <Step number={5}>
                    <em>(Optional)</em>{" "}
                    <Link href="/games" className="font-medium underline">
                        Check out our games
                    </Link>
                    , or join the server to see them firsthand!
                </Step>
            </ul>
        </main>
    );
}
