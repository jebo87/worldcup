import React from 'react';
import moment from 'moment';
import MatchAdmin from './matchAdmin';

const FechaAdmin = (props) => {
    const matchIds = Object.keys(props.matches);
    
    
    return (
        <div className="fecha_admin" >
            <div className="fecha_admin_title">
                {moment(props.fecha, 'YYYY-MM-DD', 'es').format('dddd, MMM D YYYY')}
            </div>

            {matchIds.map((matchId) => 
                 (
                     <MatchAdmin phase={props.phase} match={props.matches[matchId]} fecha={props.fecha} matchId={matchId} key={matchId} flags={props.flags}/>
                    
                 )
            )}



        </div>
    )

}

export default FechaAdmin;