import React from 'react';
import flags from '../helpers/flags';

export default class Match extends React.Component {
    render() {
        return (

            <div className="match match__finished">
                <div className="match_top">
                    <div className="match_team">
                        <div class="match_country">
                            <img src={flags[0].flag} alt="" />
                            <p>RUSIA</p>
                        </div>
                        <p class="match_score">2</p>
                    </div>
                    <div className="match_center">
                        <p>GRUPO A</p>
                        <p class="vs">vs</p>
                        <p class="time">11:00AM</p>
                    </div>
                    <div className="match_team">
                        <div class="match_country">
                            <img src={flags[1].flag} alt="" />
                            <p>A. SAUDITA</p>
                        </div>
                        <p class="match_score">0</p>
                    </div>
                </div>
                <div className="match_bottom">
                    
                </div>

            </div>
        )
    }
}

