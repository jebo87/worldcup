const phaseReducerDefaultState ={
    phase:"one"
}

const phaseReducer = (state = phaseReducerDefaultState,action) => {
    switch (action.type){
        case 'SET_PHASE':
            return action.phase;
            
        default:
            return state;
    }
}

export default phaseReducer;