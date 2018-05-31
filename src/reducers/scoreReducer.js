const scoreReducerDefaultState = {
    user: undefined,
    fecha: undefined,
    matchId: undefined,
    group: '',
    teamA: '',
    teamB: '',
    scoreA: 0,
    scoreB: 0,
    error:undefined

};

const scoreReducer = (state = scoreReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_SCORE':
            return {
                ...state,
                ...action.score
            }
        case 'SET_SCORE_ERROR':
            return {
                ...state,
                ...action.error
            }
        default:
            return state;

    }
}

export default scoreReducer;