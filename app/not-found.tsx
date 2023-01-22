import Error from "@/components/Error";

export default function NotFound() {
    return <Error code={404}>
        The page you are looking for was moved or does not exist.
    </Error>
}