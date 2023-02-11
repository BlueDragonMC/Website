import Error from "@/components/Error";

export default function ServerErrorPage() {
    return (
        <Error code={500}>
            There was an internal server error while processing your request.
        </Error>
    );
}
