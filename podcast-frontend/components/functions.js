import { getCookie } from "cookies-next";
import { useEffect } from "react";
import { actionTypes } from "../redux/reducer";
import { useStateValue } from "../redux/StateProvider";

export const isSignedIn = (user) => {
    // alert(user)
    if (user == null)
        return false;
    return true;
}


export const isAuthenticated = (email) => {
    const [{user},dispatch] = useStateValue();

    if (isSignedIn(user) && user?.email === email)
        return true;
    else
        return false;
}

export const isCreator = (user) => {
    return user.isCreator;

} 

export const loginUser= () => {
  const [{ }, dispatch] = useStateValue();
    
    useEffect(() => {
        if (getCookie("user")) {
          const u = JSON.parse(getCookie("user"))
          console.log(u);
          dispatch({
            type: actionTypes.SET_USER,
            user: u
          })
        }
    
      }, [])
    
}

export const resetUrl = () => {
  const [{ }, dispatch] = useStateValue();
  useEffect(()=>{
    dispatch({
      type: actionTypes.SET_URL,
      podcast: {title: "",creators: "", url: null},
    })
  })
  
}