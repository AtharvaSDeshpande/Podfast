import { makeStyles } from "@material-ui/core";
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
          // console.log(u);
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

export const rand = () => {
  return Math.round(Math.random() * 20) - 10;
}

export const getModalStyle = () => {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export const useModalStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));