export const initialState = {
    user: null,
    dashboardpage: 0,
};

export const actionTypes = {
    SET_USER: "SET_USER",
    SET_DASHBOARDPAGE: "SET_DASHBOARDPAGE",
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
        
        
        default:
            return state;
    }
}
export default reducer;