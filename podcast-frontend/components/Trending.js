import { Profiler, useEffect, useState } from "react"

function Trending() {
    // const [suggestions, setSuggestions] = useState([]);
    // useEffect(() => {
    //     const suggestions = [...Array(5)].map((_, i) => ({
    //         ...faker.helpers.contextualCard(),
    //         id: i,
    //     }))
    //     setSuggestions(suggestions)
    // }, [])
    return (
        <div className="mt-8 ml-10">
            <div className="flex justify-between text-sm mb-5">
                <h3 className="text-sm font-bold text-gray-500 ml-5">Trending Podcasts</h3>
                <button className="font-semibold text-sm text-blue-600 mr-5">See All</button>

            </div>
            {/* {
                suggestions.map(profile => (
                    <div key={profile.id} className="flex items-center justify-between mt-3" >
                        <img className="w-10 h-10 rounded-full border p-[2px]" src={profile.avatar} alt="" />
                        <div className="flex-1 mx-4">
                            <h2 className="font-bold">{profile.username}</h2>
                            <h3 className="text-sm text-gray-400">{profile.name}</h3>

                        </div>
                        <button className="font-bold text-sm text-blue-600">Follow</button>
                    </div>
                ))
            } */}
        </div>
    )
}

export default Trending
