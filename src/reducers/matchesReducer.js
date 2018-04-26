const matchesReducerInitialState = {

}

const matchesReducer = (state=matchesReducerInitialState, action) =>{
    switch(action.type){
        case 'SET_MATCHES':
            return {
                ...action.fechas
            }
        default:
            return state;
    }
}

export default matchesReducer;