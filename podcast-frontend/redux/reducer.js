export const initialState = {
    user: null,
    dashboardpage: 0,
    podcast: {id: "", title: "",creators: "", url: null},
    podcasts: [],
    savedpodcasts: [],
    uploadedpodcasts: [],
    archivedpodcasts: []
};

export const actionTypes = {
    SET_USER: "SET_USER",
    SET_DASHBOARDPAGE: "SET_DASHBOARDPAGE",
    SET_URL: "SET_URL",
    SET_PODCASTS:"SET_PODCASTS",
    SET_UPLOADEDPODCASTS: "SET_UPLOADEDPODCASTS",
    SET_SAVEDPODCASTS: "SET_SAVEDPODCASTS" ,
    SET_ARCHIVEDPODCASTS: "SET_ARCHIVEDPODCASTS"
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
            // console.log(action.podcasts)
            return {
                ...state,
                podcasts: action.podcasts
            }
        case actionTypes.SET_SAVEDPODCASTS:
            console.log(action.savedpodcasts)
            return{
                ...state,
                savedpodcasts: action.savedpodcasts
            }
        case actionTypes.SET_UPLOADEDPODCASTS:
            return {
                ...state,
                uploadedpodcasts: action.uploadedpodcasts
            }
        case actionTypes.SET_ARCHIVEDPODCASTS:
            return {
                ...state,
                archivedpodcasts: action.archivedpodcasts
            }
        
        default:
            return state;
    }
}
export default reducer;