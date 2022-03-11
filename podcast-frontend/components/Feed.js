import { useStateValue } from "../redux/StateProvider"
import { isSignedIn } from "./functions";
import MiniProfile from "./MiniProfile"
import Posts from "./Posts"



import Trending from "./Trending"

function Feed() {
    const [{user},dispatch] = useStateValue();
    // isSignedIn(user);
    return (
        <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto py-3">
            <section className='md:col-span-2'>   {/* Section */}
                {/* Posts */}
                <Posts path = "../api/podcast/podcasts" />
            </section>

            <section className="hidden xl:inline-grid col-span-1 ">
                <div className = "fixed top-20 ml-12 pt-4">
                    {/* Mini Profile */}
                    <MiniProfile />
                    
                    {/* Suggestions */}
                    <Trending />
                </div>

            </section>

        </main>
    )
}

export default Feed
