export const BASE_PATH =
    process.env.BASE_PATH ||
    (process.env.NODE_ENV === "production"
        ? "https://bluedragonmc.com"
        : "http://localhost:3000");
export const MONGO_HOSTNAME =
    process.env.MONGO_HOSTNAME ?? "mongodb://localhost:27017";
