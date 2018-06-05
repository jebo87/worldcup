const scoreboardReducerDefaultState = {
   
}

const scoreBoardReducer = (state = scoreboardReducerDefaultState, action)=>{
    switch (action.type){
        case 'LOAD_USER_SCORES':
        return {
           
            ...action.user_scores
        };
        default:
        return state;
        

    }
}

export default scoreBoardReducer;