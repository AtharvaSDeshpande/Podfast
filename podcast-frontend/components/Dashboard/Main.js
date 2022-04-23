import React from 'react'
import { useStateValue } from '../../redux/StateProvider';
import Archived from './Archived';
import Growth from './Growth';
import Posts from './Posts';
import Upload from './Upload';

function Main() {
    const [{ user, dashboardpage }, dispatch] = useStateValue();
    switch (dashboardpage) {
        case 0:
            return <Posts/>
        case 1:
            return <Upload/>
        case 2:
            return <Growth user={user}></Growth>
        case 3:
            return <Archived/>
                
        default:
            return <Posts/>
            
    }
}

export default Main