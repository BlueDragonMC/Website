import Step from "@/components/Step";
import Link from "next/link";

export default function Page() {
    const emphasis = "text-green-500 dark:text-amber-500 font-bold";

    return (
        <main>
            <h1 className="text-3xl font-bold">How To Join</h1>
            <ul>
                <Step number={1}>
                    Launch Minecraft 1.19.2{" "}
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
                    <span className="text-green-500 font-medium">
                        That's it! 🎉
                    </span>
                </Step>
                <Step number={5}>
                    <em>(Optional)</em> Click{" "}
                    <Link
                        href="/games"
                        className="text-blue-500 font-medium underline"
                    >
                        here
                    </Link>{" "}
                    to check out our games, or join the server to see them
                    firsthand!
                </Step>
            </ul>
        </main>
    );
}
