import database from '../helpers/database';
export const setMatches = (fechas = {}) => (
    {
        type: 'SET_MATCHES',
        fechas: { ...fechas }
    }
);

export const startSetMatches = () => {
    return (dispatch) => {
        return database.ref('fechas').once('value', (snapshot) => {
            let fechas = {};
            fechas = snapshot.val();
            dispatch(setMatches(fechas), { allowMore: true });
        });
    };
};


export const startSetMatchScore = (match = {}) => {
    return (dispatch) => {

        return database.ref('fechas/' + match['fecha'] + '/matches/' + match['matchId'] + '/match_score/').update({
            finished: true,
            scoreA: match['scoreA'],
            scoreB: match['scoreB']

        }).then(() => {
            dispatch(startSetMatches());
        })
            ;
    }
}

export const startToggleFinished = (match = {}) => {
    return (dispatch) => {
       
        return database.ref('fechas/' + match['fecha'] + '/matches/' + match['matchId'] + '/match_score/').update({
            finished: !match.finished
        }).then(() => {
            dispatch(startSetMatches());
        })

    }
}