import React from 'react'
import { useStateValue } from '../../redux/StateProvider';

function Main() {
    const [{ user, dashboardpage }, dispatch] = useStateValue();
    switch (dashboardpage) {
        case 0:
            return <div>HOME</div>
        
        case 1:
            return <div>PODCASTS</div>
        case 2:
            return <div>UPLOAD</div>
        case 3:
            return <div>PROFILE</div>
        case 4:
            return <div>GROWTH</div>
                
        default:
            return <div>HOME</div>
            
    }
}

export default Main