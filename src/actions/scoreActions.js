import database from '../helpers/database';
import { startSetMatches } from './matchesActions';
import moment from 'moment';

export const setScore = (score) => ({
	type: 'SET_SCORE',
	score
});
export const setScoreError = (error) => ({
	type: 'SET_SCORE_ERROR',
	error
});

export const startSetScore = (score) => {
	return (dispatch) => {
		const myHeaders = new Headers();
		// myHeaders.append("Content-Type", "text/plain");

		const myInit = {
			method: 'GET',
			headers: myHeaders,
			mode: 'cors',
			cache: 'default'
		};

		const myRequest = new Request('http://www.elbauto.com:8090/time', myInit);
		let serverTime = undefined;

		fetch(myRequest)
			.then((response) => response.json()) //this is the promise
			.then((responseJSON) => {
				//actual result
				let serverDate = responseJSON['datetime'];
				serverTime = moment(serverDate, 'YYYY-MM-DD HH:mm'); //create a moment with the server time
				const matchTime = moment(score.fecha + ' ' + score.time, 'YYYY-MM-DD HH:mm');

				if (serverTime.isSameOrBefore(matchTime)) {
					database
						.ref('fechas/' + score.fecha + '/matches/' + score.matchId + '/scores/' + score.user)
						.set({
							scoreA: score.scoreA,
							scoreB: score.scoreB
						})
						.then(() => {
							dispatch(startSetMatches());
							// dispatch(setScore(score));
						});
				} else {
					dispatch(setScore({ error: 'Match already started' }));
				}
			});
	};
};
