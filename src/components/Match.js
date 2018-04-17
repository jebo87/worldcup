import React from 'react';
import flags from '../helpers/flags';

export default class Match extends React.Component {
    render() {
        return (
            // Es mejor hacer dos componentes diferentes. uno para matches finalizados y otro para los demas
            <div className="match">

                <div className="match_team">
                    <div className="match_country">
                        <img src={flags[0].flag} alt="" />
                        <p>RUSIA</p>
                    </div>
                    <p className="match_score">2</p>
                </div>
                <div className="match_center">
                    <p>GRUPO A</p>
                    <p className="vs">vs</p>
                    <p className="time">11:00AM</p>
                </div>
                <div className="match_team">
                    <div className="match_country">
                        <img src={flags[1].flag} alt="" />
                        <p>A. SAUDITA</p>
                    </div>
                    <p className="match_score">0</p>
                </div>
                <div class="ribbon"><span>enviado</span></div>
            </div>
        )
    }
}

