const scoreReducerDefaultState = {
    group: '',
    teamA: '',
    teamB: ''

};

const scoreReducer = (state = scoreReducerDefaultState, action) => {
    switch(action.type){
        case 'SET_SCORE':
            return {
                ...action.score
            }
        default:
            return state;

    }
}

export default scoreReducer;