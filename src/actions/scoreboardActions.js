import database from '../helpers/database';

export const loadUserScores = (user_scores={}) => (
    {
        type: 'LOAD_USER_SCORES',
         user_scores : { ...user_scores}
           
        
    }
)
export const startLoadUserScores = () => {
    
    return (dispatch) => {
        return database.ref('/points').on('value',(snapshot)=>{
            let user_scores = snapshot.val();
           
            let values = Object.values(user_scores);

            values = values.sort((a,b)=>{
               
                if(a.points > b.points ) {
                    return -1;
                }else if (b.points > a.points){
                    return 1;
                }
            });
            
            dispatch(loadUserScores(values));
        });
     }
}
export const uploadPoints = () => {
    
    return (dispatch) => {
        return database.ref('/').once('value',(snapshot)=>{
            const db = snapshot.val();
            const fechas = db.fechas;
            const fkeys = Object.keys(fechas);
            const users = Object.keys(db.users);
           
            let user_scores = {};

            users.map(user => {
                let  points = 0;
                
                fkeys.map(fecha => {
                    const matchKeys = Object.keys(fechas[fecha].matches);
                    matchKeys.map((match)=>{
                        if(fechas[fecha].matches[match].scores&&fechas[fecha].matches[match].scores[user]){
                            points+=fechas[fecha].matches[match].scores[user].points || 0;
                            
                        }
                    });
                });

              
                user_scores[user] ={ 'name' :  db.users[user].name, 'points': points, 'image':db.users[user].image};
               
                
            });
            database.ref('/points').set({
                ...user_scores
            });
            // user_scores = user_scores.sort((a,b)=>{
            //     if(a.points > b.points ) {
            //         return -1;
            //     }else if (b.points > a.points){
            //         return 1;
            //     }
            // });
           dispatch(loadUserScores(user_scores));
            
        });
    }


}