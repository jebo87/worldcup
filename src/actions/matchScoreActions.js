import database from '../helpers/database';
export const setMatchScore = (match) => ({
	type: 'SET_MATCH_SCORE',
	matchScore: { ...match }
});

export const startSetMatchScore = (match) => {
	console.log(match);
	return (dispatch) => {
		if (match.teamA) {
			let userIds = Object.keys(match.scores);
			let names = [];
			database.ref('/users').once('value', (snapshot) => {
				if (snapshot.val()) {
					const usersDb = snapshot.val();
					userIds.map((id) => {
						match.scores[id].name = usersDb[id].name;
						match.scores[id].picture = usersDb[id].image;
					});
				}
				dispatch(setMatchScore(match));
			});
		} else {
			dispatch(setMatchScore({}));
		}
	};
};
