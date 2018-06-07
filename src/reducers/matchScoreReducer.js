const matchScoreReducerDefaultState = {
    // group: 'A',
    // match_score: {
    //     finished: false,
    //     scoreA: 0,
    //     scoreB: 0
    // },
    // scores: {
    //     'CbBOcmJaeseFVK7rwuovcUEqn1s2': {
    //         name: 'Jorge Bautista',
    //         picture: "https://lh6.googleusercontent.com/-uWsTuTEdTvY/AAAAAAAAAAI/AAAAAAAAHeE/Gz6UGafwo7o/photo.jpg",
    //         scoreA: 2,
    //         scoreB: 1
    //     }
    // },
    // teamA: 'rusia',
    // teamB: 'a. saudita',
    // time: '11:00'

}

const matchScoreReducer = (state = matchScoreReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_MATCH_SCORE':
            return {
                ...action.matchScore
            }
        default:
            return state;
    }
}

export default matchScoreReducer;