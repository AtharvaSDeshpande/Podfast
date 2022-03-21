import React from 'react'
import { useStateValue } from '../../redux/StateProvider';
import DashboardHome from './DashboardHome';
import Posts from './Posts';
import Upload from './Upload';

function Main() {
    const [{ user, dashboardpage }, dispatch] = useStateValue();
    switch (dashboardpage) {
        case 0:
            return <DashboardHome/>
        case 1:
            return <Posts/>
        case 2:
            return <Upload/>
        case 3:
            return <div>PROFILE</div>
        case 4:
            return <div>GROWTH</div>
                
        default:
            return <div>HOME</div>
            
    }
}

export default Main