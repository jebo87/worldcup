import React from 'react';

export default class Match extends React.Component {
    
    
    render() {
        return (
            // Es mejor hacer dos componentes diferentes. uno para matches finalizados y otro para los demas
            <div className="match">

                <div className="match_team">
                    <div className="match_country">
                        <img src={this.props.flag[0]} alt="" />
                        <p>{this.props.match.teamA}</p>
                    </div>
                    <p className="match_score">{this.props.match.scoreA}</p>
                </div>
                <div className="match_center">
                    <p>GRUPO {this.props.match.group}</p>
                    <p className="vs">vs</p>
                    <p className="time">{this.props.match.date}</p>
                </div>
                <div className="match_team">
                    <div className="match_country">
                        <img src={this.props.flag[1]} alt="" />
                        <p>{this.props.match.teamB}</p>
                    </div>
                    <p className="match_score">{this.props.match.scoreB}</p>
                </div>
                <div className="ribbon"><span>enviado</span></div>
            </div>
        )
    }
}

