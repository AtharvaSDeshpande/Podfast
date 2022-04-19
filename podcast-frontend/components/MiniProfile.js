// import { signOut,useSession } from "next-auth/react"
import { Avatar } from '@material-ui/core';
import { removeCookies } from 'cookies-next';
import { actionTypes } from '../redux/reducer';
import { useStateValue } from '../redux/StateProvider';

function MiniProfile() {

    // const { data: session } = useSession();
    const [{user},dispatch] = useStateValue();
    const signOut = () => {
        dispatch({
            type: actionTypes.SET_USER,
            user: null
        })
        removeCookies("user")
    }
    
    return (
        <div>
            <div className = "flex items-center justify-between ml-8 p-5 mt-6 border-2 border-white rounded-full">
               {/* <img className = "rounded-full border p-[2px] w-12 h-12" src = "https://firebasestorage.googleapis.com/v0/b/instagram-a0c6d.appspot.com/o/Screenshot%202022-01-05%20at%2023-25-55%20Wix%20Logo%20Maker.png?alt=media&token=ea3eec4e-3896-4361-b25c-877a47cbdd1c" alt=""/> */}
                <Avatar                             style = {{backgroundColor: `${user?.color}`}}
 className=' capitalize'>{user.name[0]}</Avatar>
                <div className="flex-1 mx-4">
                    <h2 className = "font-bold text-white capitalize">{user.name}</h2>
                    <h3 className = "text-sm  text-white">Welcome to Podfast</h3>
                </div>
                <button onClick={signOut} className="font-semibold text-sm text-blue-600" >Sign Out</button> 
            </div>
            
        </div>
    )
}

export default MiniProfile
