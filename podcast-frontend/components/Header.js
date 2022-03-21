import { Avatar, Tooltip } from "@material-ui/core";
import { AddCircleOutline, BookmarkBorderOutlined, Dashboard, ExitToApp, Fireplace, Home, Menu as MenuIcon, NotListedLocationOutlined, Search, SendSharp, Whatshot } from "@material-ui/icons";
import { useStateValue } from "../redux/StateProvider";
import { actionTypes } from "../redux/reducer";
import { removeCookies } from "cookies-next";

import { useState } from "react";
// import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';


import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { useRouter } from "next/router";

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
        margin: "1px"
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        
    },
}))(MenuItem);

function Header() {
    const router = useRouter()

    const [{ user }, dispatch] = useStateValue();
    const signOut = () => {
        dispatch({
            type: actionTypes.SET_USER,
            user: null
        })
        removeCookies("user")

    }
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = (path) => {
        handleClose();
        handlePlayer();
        router.push(path);
    }
    const handlePlayer = () => {
        dispatch({
            type: actionTypes.SET_URL,
            podcast: {title: "",creators: "", url: null},
          })
    }
    return (
        <div className="shadow-sm border-neutral-800 border-b bg-gradient-to-t from-black to-gray-900  sticky top-0 z-50 w-full  py-3 ">
            <div className='flex justify-between  max-w-6xl mx-5 xl:mx-auto'>
                <div className="cursor-pointer relative inline-grid w-24 place-items-center ">
                    <img src="https://firebasestorage.googleapis.com/v0/b/instagram-a0c6d.appspot.com/o/PODFAST%20LOGO%20Transperency%20-%200.gif?alt=media&token=fe98c4fa-7a6b-47fb-a1c0-69a6486681ba"

                        className="object-contain "
                        onClick = {()=>navigate("/")}
                    />
                </div>
                {/* <div className=" cursor-pointer relative inline-grid flex-shrink-0 md:hidden w-10 place-items-center">
                    <img src="https://firebasestorage.googleapis.com/v0/b/instagram-a0c6d.appspot.com/o/Screenshot%202022-01-05%20at%2023-25-55%20Wix%20Logo%20Maker.png?alt=media&token=ea3eec4e-3896-4361-b25c-877a47cbdd1c"
                        className="object-contain "
                    />
                </div> */}


                {/* Right */}
                <div className="flex items-center justify-end space-x-4" >
                    <div  onClick = {()=>navigate("/")}>
                        <Tooltip title="Home">
                            <div className="navButton">
                                <Home />
                            </div>

                        </Tooltip>
                    </div>
                    <div onClick = {()=>navigate("/explore")} >
                        <Tooltip title="Explore">
                            <div className="navButton">
                                <Search />
                            </div>

                        </Tooltip>
                    </div>

                    {/* {session ? (
                        <> */}
                    {/* <div className="relative navButton">
                        <Tooltip title="Direct">
                            <div className="navButton -rotate-90">
                                <SendSharp />
                            </div>

                        </Tooltip>

                        <div className="absolute -top-2 -right-1 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white">3</div>
                    </div> */}

                    {/* <AddCircleOutline className="navButton" onClick={() => { setOpen(true) }} /> */}
                    <div onClick = {()=>navigate("/trending")}>
                        <Tooltip title="Trending">
                            <div className="navButton"><Whatshot /></div>
                        </Tooltip>
                    </div>
                    <div onClick = {()=>navigate("/saved")} >
                    <Tooltip title="Saved">
                        <div className="navButton"><BookmarkBorderOutlined /></div>

                    </Tooltip>
                    </div>
                    {user?.isCreator ? (

                        <div onClick = {()=>navigate("/dashboard")} >
                            <Tooltip title="Dashboard">
                            <div className="navButton"><Dashboard /></div>
                        </Tooltip></div>

                    ) : null}

                
                    <Tooltip title="Menu" >
                        <div className=" h-6 md:hidden text-white cursor-pointer hover:scale-125 transition-all duration-150 ease-out">
                            <MenuIcon onClick={handleClick} />
                        </div>

                    </Tooltip>

                    {user ? (
                        <Avatar
                            alt=""
                            className={`h-10 w-10  cursor-pointer uppercase bg-[${user?.color}] hidden md:flex`}
                            onClick={()=>{navigate("/profile")}}

                        >{user != null ? user?.name[0] : null}</Avatar>

                    ) : null}
                    {/* </>
                    ) : (
                            <button className="bg-blue-700 p-2 rounded-md text-white">Sign In</button>

                    )} */}


                </div>

            </div>


            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem onClick = {()=>navigate("/")}>
                    <ListItemIcon>
                        <Home fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </StyledMenuItem>
                <StyledMenuItem onClick = {()=>navigate("/explore")}>
                    <ListItemIcon>
                        <Search fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Search" />
                </StyledMenuItem>
                {/* <StyledMenuItem onClick = {()=>navigate("/")}>
                    <ListItemIcon>
                        <SendSharp fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Direct" />
                </StyledMenuItem> */}
                <StyledMenuItem onClick = {()=>navigate("/trending")}>
                    <ListItemIcon>
                        <Whatshot fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Trending" />
                </StyledMenuItem>
                <StyledMenuItem onClick = {()=>navigate("/saved")}>
                    <ListItemIcon>
                        <BookmarkBorderOutlined fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Saved" />
                </StyledMenuItem>
                <StyledMenuItem onClick = {()=>navigate("/profile")}>
                    <ListItemIcon>
                        <PermIdentityIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </StyledMenuItem>
                {user?.isCreator ? (
                    <StyledMenuItem onClick = {()=>navigate("/dashboard")}>
                        <ListItemIcon>
                            <Dashboard fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </StyledMenuItem>
                ) : null}
                <StyledMenuItem onClick={signOut}>
                    <ListItemIcon>
                        <ExitToApp fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Signout" />
                </StyledMenuItem>
            </StyledMenu>
        </div>
    )
}

export default Header