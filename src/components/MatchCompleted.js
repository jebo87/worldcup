import React from 'react';
import flags from '../helpers/flags';
import {connect} from 'react-redux';
import { startSetMatchScore } from '../actions/matchScoreActions';

class MatchCompleted extends React.Component {
    user = this.props.user.userId;
    scores = this.props.match.scores?this.props.match.scores[this.user]:undefined;
    loadMatchScores = () => {
        this.props.dispatch(startSetMatchScore(this.props.match));
    }
    render() {
        return (
            // Es mejor hacer dos componentes diferentes. uno para matches finalizados y otro para los demas
            <div className="match__finished">
                <div className="match_top">
                    <div className="match_team">
                        <div className="match_country">
                            <img src={this.props.flag[0]} alt="" />
                            <p>{this.props.match.teamA}</p>
                        </div>
                        <span className="match_score">{this.scores && this.scores.scoreA}</span>
                    </div>
                    <div className="match_center">
                        <p>{this.props.match.group.length>1?false:'GRUPO'} {this.props.match.group}</p>
                        <p className="vs">vs</p>
                        <p className="time">11:00AM</p>
                    </div>
                    <div className="match_team">
                        <div className="match_country">
                            <img src={this.props.flag[1]} alt="" />
                            <p>{this.props.match.teamB}</p>
                        </div>
                        <span className="match_score">{this.scores && this.scores.scoreB}</span>
                    </div>
                </div>
                <div className="match_bottom">
                    <div className="match_bottom_text">
                        <div className="match_bottom_text_pink">
                            Resultado real:
                         </div>
                        {this.props.match.teamA} {this.props.match['match_score'].scoreA} - {this.props.match.teamB} {this.props.match['match_score'].scoreB}
                    </div>
                    <div className="match_bottom_text">
                    <div className="match_bottom_text_pink">
                        Puntos obtenidos:
                     </div>
                    {this.scores&&this.scores.points || <span>0</span>}
                    <div className="match_others_completed">
                            <button className="button_nav_completed" onClick={this.loadMatchScores}>ver pronosticos</button>
                        </div>
                </div>

                </div>
                <div className="ribbon ribbon_pink"><span>Finalizado</span></div>
            </div>
        )
    }
}

const mapStateToProps = (state,props) =>{
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(MatchCompleted);