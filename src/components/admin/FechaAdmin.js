import React from 'react';
import moment from 'moment';

const FechaAdmin = (props) => {
    const matchIds = Object.keys(props.matches);
    console.log(matchIds);
    
    return (
        <div className="fecha" >
            <div className="fecha_title">
                {moment(props.fecha, 'YYYY-MM-DD', 'es').format('dddd, MMM D YYYY')}
            </div>

            {matchIds.map((matchId) => 
                 (
                    <p key={matchId}>{props.matches[matchId].teamA} - {props.matches[matchId].teamB}</p>
                 )
            )}



        </div>
    )

}

export default FechaAdmin;