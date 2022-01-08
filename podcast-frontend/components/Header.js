import Image from "next/image";

// import { signIn, signOut, useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom"
import { Tooltip } from "@material-ui/core";
import { AddCircleOutline, BookmarkBorderOutlined, Fireplace, Home, Menu, Search, SendSharp, Whatshot } from "@material-ui/icons";
// import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
function Header() {

    // const { data: session } = useSession();
    const [open, setOpen] = useRecoilState(modalState)
    // console.log(session);
    return (
        <div className="shadow-sm border-neutral-800 border-b bg-gradient-to-t from-black to-gray-900  sticky top-0 z-50 w-full  py-3 ">
            <div className='flex justify-between  max-w-6xl mx-5 xl:mx-auto'>
                <div className="cursor-pointer relative hidden md:inline-grid w-24 place-items-center ">
                    <img src="https://firebasestorage.googleapis.com/v0/b/instagram-a0c6d.appspot.com/o/Screenshot%202022-01-05%20at%2023-23-10%20Wix%20Logo%20Maker.png?alt=media&token=7e38466a-34e7-4a00-b67f-3c207ba09613"

                        className="object-contain "
                    />
                </div>
                <div className=" cursor-pointer relative inline-grid flex-shrink-0 md:hidden w-10 place-items-center">
                    <img src="https://firebasestorage.googleapis.com/v0/b/instagram-a0c6d.appspot.com/o/Screenshot%202022-01-05%20at%2023-25-55%20Wix%20Logo%20Maker.png?alt=media&token=ea3eec4e-3896-4361-b25c-877a47cbdd1c"
                        className="object-contain "
                    />
                </div>
                {/* Middle */}
                {/* <div className="max-w-xs">
                    <div className="mt-1 relative p-3 rounded-md">
                        <div className="absolute inset-y-0 flex items-center pointer-events-none">
                            <SearchIcon className='h-5 w-5 text-gray-500 ml-1' />
                        </div>
                        <input type="text" className="bg-neutral-700 block w-full text-white pl-10 sm:text-sm border-gray-200 rounded-md focus:ring-white focus:border-white" placeholder="Search" />
                    </div>
                </div> */}

                {/* Right */}
                <div className="flex items-center justify-end space-x-4" >
                    <Tooltip title="Home">
                        <div className="navButton">
                            <Home />
                        </div>

                    </Tooltip>
                    <Tooltip title="Explore">
                        <div className="navButton">
                            <Search />
                        </div>

                    </Tooltip>

                    {/* {session ? (
                        <> */}
                    <div className="relative navButton">
                        <Tooltip title="Direct">
                            <div className="navButton -rotate-90">
                                <SendSharp />
                            </div>

                        </Tooltip>

                        <div className="absolute -top-2 -right-1 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white">3</div>
                    </div>

                    {/* <AddCircleOutline className="navButton" onClick={() => { setOpen(true) }} /> */}
                    <Tooltip title="Trending">
                        <div className="navButton"><Whatshot /></div>
                    </Tooltip>
                    <Tooltip title="Saved">
                        <div className="navButton"><BookmarkBorderOutlined /></div>

                    </Tooltip>
                    <Tooltip title="Menu" >
                        <div className=" h-6 md:hidden text-white cursor-pointer hover:scale-125 transition-all duration-150 ease-out">
                            <Menu />
                        </div>

                    </Tooltip>
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/aces-website-9fc34.appspot.com/o/Desert.jpg?alt=media&token=f01e4845-bf54-43fa-938b-607f72ea1013"
                        alt=""
                        className="h-10 w-10 rounded-full cursor-pointer"
                    // onClick = {signOut}

                    />
                    {/* </>
                    ) : (
                            <button className="bg-blue-700 p-2 rounded-md text-white">Sign In</button>

                    )} */}


                </div>

            </div>


        </div>
    )
}

export default Header