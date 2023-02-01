import { PropsWithChildren } from "react";
import styles from "./error.module.css";

type ErrorProps = PropsWithChildren<{
    code: number;
}>;

export default function Error({ code, children }: ErrorProps) {
    return (
        <div
            className="flex flex-col items-center justify-center"
            style={{ height: "70vh" }}
        >
            <div
                className="flex h-1/2 flex-col justify-end bg-opacity-25 bg-cover bg-center bg-no-repeat"
                id={styles["main-404-div"]}
            >
                <h1 className="text-center text-9xl font-black">{code}</h1>
                <p className="text-center font-medium">{children}</p>
            </div>
        </div>
    );
}
