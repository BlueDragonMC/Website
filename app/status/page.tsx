import {
    faCalendar,
    faCircle,
    faPersonRunning,
    faServer,
    IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { JavaStatusResponse, status } from "minecraft-server-util";
import RelativeDate from "./components/RelativeDate";

export const dynamic = "force-dynamic";

export default async function Status() {
    let ping: JavaStatusResponse | undefined;
    try {
        ping = await status(process.env.SERVER_IP ?? "bluedragonmc.com");
    } catch (e) {}

    return (
        <main className="mx-auto w-max">
            <h1 className="text-3xl font-bold">Server Status</h1>
            <pre>Server IP: bluedragonmc.com</pre>
            <p>
                <Icon icon={faCircle} />
                {ping ? (
                    <span className="text-green-500 font-bold underline">
                        Online
                    </span>
                ) : (
                    <span className="text-red-500 font-bold underline">
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
        className="w-8 h-8 mr-4 my-2 inline align-middle"
        icon={icon}
    />
);
