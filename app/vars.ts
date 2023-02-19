export const BASE_PATH =
    process.env.BASE_PATH ||
    (process.env.NODE_ENV === "production"
        ? "https://bluedragonmc.com"
        : "http://localhost:3000");
export const MONGO_HOSTNAME =
    process.env.MONGO_HOSTNAME ?? "mongodb://127.0.0.1:27017";
export const LP_HOSTNAME =
    process.env.LUCKPERMS_HOSTNAME ?? "http://127.0.0.1:8080";
