import { useStateValue } from "../redux/StateProvider"
import Creator from "./Creator";
import { isSignedIn } from "./functions";
import MiniProfile from "./MiniProfile"
import Posts from "./Posts"



function Feed() {
    const [{user},dispatch] = useStateValue();
    // isSignedIn(user);
    
    return (
        <main  className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto py-3">
            <section className='md:col-span-2'>   {/* Section */}
                {/* Posts */}
                <Posts path = "../api/podcast/podcasts" />
            </section>

            <section className="hidden xl:inline-grid col-span-1 ">
                <div className = "fixed top-20 ml-12 pt-4">
                    {/* Mini Profile */}
                    <MiniProfile />
                    
                    {/* Suggestions */}
                    <div className="ml-8 p-5 mt-5 max-h-[300px] overflow-y-scroll rounded-lg text-white border-2 ">
                        <p>Subscribers</p>
                        <Creator id = {"1"} name = "atharva Deshpande" email = "atharvasd14@gmail.com"/>
                        <Creator id = {"1"} name = "atharva Deshpande" email = "atharvasd14@gmail.com"/>
                        <Creator id = {"1"} name = "atharva Deshpande" email = "atharvasd14@gmail.com"/>
                        <Creator id = {"1"} name = "atharva Deshpande" email = "atharvasd14@gmail.com"/>
                        <Creator id = {"1"} name = "atharva Deshpande" email = "atharvasd14@gmail.com"/>
                        <Creator id = {"1"} name = "atharva Deshpande" email = "atharvasd14@gmail.com"/>

                    </div>
                </div>

            </section>

        </main>
    )
}

export default Feed
