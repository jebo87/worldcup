const matchScoreReducerDefaultState = {};

const matchScoreReducer = (state = matchScoreReducerDefaultState, action) => {
	switch (action.type) {
		case 'SET_MATCH_SCORE':
			return {
				...action.matchScore
			};
		default:
			return state;
	}
};

export default matchScoreReducer;
