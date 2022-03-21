export const initialState = {
    user: null,
    dashboardpage: 0,
    podcast: {title: "",creators: "", url: null},
    podcasts: []
};

export const actionTypes = {
    SET_USER: "SET_USER",
    SET_DASHBOARDPAGE: "SET_DASHBOARDPAGE",
    SET_URL: "SET_URL",
    SET_PODCASTS:"SET_PODCASTS", 
}

const reducer = (state,action) => {
    switch(action.type)
    {
        case actionTypes.SET_USER:
            console.log(action.user)
            return  {
                            ...state,
                            user: action.user,          //  Change the user to what we dispatched
                    };
        case actionTypes.SET_DASHBOARDPAGE:
            console.log(action.dashboardpage)
            return  {
                ...state,
                dashboardpage: action.dashboardpage,          //  Change the user to what we dispatched
        };
        case actionTypes.SET_URL:
            return {
                ...state,
                podcast: action.podcast
            }
        case actionTypes.SET_PODCASTS:
            console.log(action.podcasts)
            return {
                ...state,
                podcasts: action.podcasts
            }
        
        default:
            return state;
    }
}
export default reducer;