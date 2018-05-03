import database from '../helpers/database';
import { startSetMatches } from './matchesActions';

export const setScore = (score) => (
    {
        type: 'SET_SCORE',
        score
    }
);

export const startSetScore = (score) => {
    return (dispatch) => {
        database.ref('fechas/' + score.fecha + '/matches/' + score.matchId + '/scores/' + score.user).set({
            scoreA: score.scoreA,
            scoreB: score.scoreB
        });
        dispatch(startSetMatches());
        dispatch(setScore(score));
        
    }

}