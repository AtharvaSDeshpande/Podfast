export const initialState = {
    user: null,
    dashboardpage: 0,
    skip: 0,
    podcast: {id: "", title: "",creators: "", url: null, img: null},
    podcasts: [],
    savedpodcasts: [],
    uploadedpodcasts: [],
    archivedpodcasts: [],
    recommendedpodcasts: [],
    creatorspodcasts: [],
    searchedpodcasts: [],
    searchedontagspodcasts: [],
};

export const actionTypes = {
    SET_USER: "SET_USER",
    SET_DASHBOARDPAGE: "SET_DASHBOARDPAGE",
    SET_SKIP: "SET_SKIP",
    SET_URL: "SET_URL",
    SET_PODCASTS:"SET_PODCASTS",
    SET_UPLOADEDPODCASTS: "SET_UPLOADEDPODCASTS",
    SET_SAVEDPODCASTS: "SET_SAVEDPODCASTS" ,
    SET_ARCHIVEDPODCASTS: "SET_ARCHIVEDPODCASTS",
    SET_RECOMMENDEPODCASTS: "SET_RECOMMENDEPODCASTS",
    SET_CREATORSPODCASTS: "SET_CREATORSPODCASTS",
    SET_SEARCHPODCASTS: "SET_SEARCHPODCASTS",
    SET_SEARCHONTAGSPODCASTS: "SET_SEARCHONTAGSPODCASTS", 
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
        case actionTypes.SET_SKIP:
            return {
                ...state,
                skip: action.skip
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
        case actionTypes.SET_RECOMMENDEPODCASTS:
            return {
                ...state,
                recommendedpodcasts: action.recommendedpodcasts
            }
        case actionTypes.SET_CREATORSPODCASTS:
            return {
                ...state,
                creatorspodcasts: action.creatorspodcasts
            }
        case actionTypes.SET_SEARCHPODCASTS: 
            return {
                ...state,
                searchedpodcasts: action.searchedpodcasts
            }
        case actionTypes.SET_SEARCHONTAGSPODCASTS: 
            return {
                ...state,
                searchedontagspodcasts: action.searchedontagspodcasts
            }
        
        default:
            return state;
    }
}
export default reducer;