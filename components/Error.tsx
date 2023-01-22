import { PropsWithChildren } from "react";
import styles from "./error.module.css";

type ErrorProps = PropsWithChildren<{
    code: number
}>

export default function Error({ code, children }: ErrorProps) {
    return (
        <div className="flex justify-center items-center flex-col" style={{ height: "70vh" }}>
            <div className="h-1/2 bg-center bg-cover bg-no-repeat bg-opacity-25 flex flex-col justify-end" id={styles["main-404-div"]}>
                <h1 className="text-9xl font-black text-center">{code}</h1>
                <p className="text-center font-medium">{children}</p>
            </div>
        </div>
    );
}