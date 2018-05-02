import database from '../helpers/database';
export const setMatches = (fechas = {}) => (
    {
        type: 'SET_MATCHES',
        fechas: { ...fechas }
    }
);

export const startSetMatches = () => {
    return (dispatch) => {
        return database.ref('fechas').on('value',(snapshot) => {
            let fechas = {};
            fechas = snapshot.val() ;
            dispatch(setMatches(fechas));
        });
    };
};