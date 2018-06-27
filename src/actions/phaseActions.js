
import database from '../helpers/database';

export const setPhase = (phase) => (
    {
        type: 'SET_PHASE',
        phase
    }
)
export const startSetPhase = () => {
    return (dispatch) => {
        database.ref('/phase').once('value', (snapshot) => {
            if(snapshot.val())
            console.log('PHASE'+snapshot.val());
            dispatch(setPhase(snapshot.val()));
        })
    }
}