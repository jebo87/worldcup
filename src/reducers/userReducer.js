const userReducerDefaultState = {
    email: undefined,
    userId:undefined
};

const userReducer = (state = userReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...action.user
            };
        case 'DELETE_USER':
            return {
                
            };
        default:
            return state;

    }
}

export default userReducer;