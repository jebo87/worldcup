import React from 'react';
import MatchList from './MatchList';
import moment from 'moment';

const Fecha = (props) => {
    return (
        <div className="fecha" >
            <div className="fecha_title">
                {moment(props.fecha,'DD-MM-YYYY','es').format('dddd, MMM D YYYY')}
            </div>

            <MatchList fecha={props.fecha} matches={props.matches}/>

        </div>
    )

}

export default Fecha;