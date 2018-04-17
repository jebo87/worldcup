import React from 'react';
import flags from '../helpers/flags';

export default class Match extends React.Component {
    render() {
        return (
            // Es mejor hacer dos componentes diferentes. uno para matches finalizados y otro para los demas
            <div className="match__finished">
                <div className="match_top">
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
                </div>
                <div className="match_bottom">
                    <div className="match_bottom_text">
                        <div className="match_bottom_text_pink">
                            Resultado real:
                         </div>
                        Rusia 3 - A. Saudita 1
                    </div>
                    <div className="match_bottom_text">
                    <div className="match_bottom_text_pink">
                        Puntos obtenidos:
                     </div>
                    1
                </div>

                </div>
                <div class="ribbon ribbon_pink"><span>Finalizado</span></div>
            </div>
        )
    }
}

