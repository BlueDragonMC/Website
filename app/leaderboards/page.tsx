import Link from "next/link"
import { leaderboards } from "./leaderboards"

export default function Page() {
    
    return (
        <>
            <h1 className="text-3xl font-bold">Leaderboards</h1>
            {
                leaderboards.map((category) => {
                    return <div key={category.name}>
                        <span className="text-2xl font-extrabold">{category.name}</span>
                        <>
                            {category.leaderboards.map((lb) => {
                                return <Link key={lb.stat} className="text-xl underline font-medium mx-2" href={"/leaderboards/" + lb.stat}>{lb.name}</Link>
                            })}
                        </>
                    </div>
                })}
        </>
    )
}