import FontAwesomeIcon from "@/components/FontAwesomeIcon";
import {
    faCalendar,
    faCircle,
    faPersonRunning,
    faServer,
    IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import {
    JavaStatusResponse,
    parseAddress,
    ParsedAddress,
    status,
} from "minecraft-server-util";
import RelativeDate from "./components/RelativeDate";

export const dynamic = "force-dynamic";

export default async function Status() {
    let ping: JavaStatusResponse | undefined;
    try {
        const { host, port } = parseAddress(
            process.env.SERVER_IP ?? "bluedragonmc.com",
            25565
        ) as ParsedAddress;
        ping = await status(host, port);
    } catch (e) {}

    return (
        <main className="mx-auto w-max">
            <h1 className="text-3xl font-bold">Server Status</h1>
            <pre>Server IP: bluedragonmc.com</pre>
            <p>
                <Icon icon={faCircle} />
                {ping ? (
                    <span className="font-bold text-green-500 underline">
                        Online
                    </span>
                ) : (
                    <span className="font-bold text-red-500 underline">
                        Offline
                    </span>
                )}
            </p>
            {ping && (
                <>
                    <p>
                        <Icon icon={faPersonRunning} />
                        {ping.players.online} players connected
                    </p>
                    <p>
                        <Icon icon={faServer} />
                        Ping: {ping.roundTripLatency}ms
                    </p>
                </>
            )}
            <p>
                <Icon icon={faCalendar} />
                Last Updated: <RelativeDate />
            </p>
        </main>
    );
}

const Icon = ({ icon }: { icon: IconDefinition }) => (
    <FontAwesomeIcon
        className="my-2 mr-4 inline h-8 w-8 align-middle"
        icon={icon}
    />
);
