import React from 'react';
import { connect } from 'react-redux';

class Match extends React.Component {
    user = this.props.user.userId;
    scores = this.props.match.scores?this.props.match.scores[this.user]:undefined;
    

    render() {
      
        return (
            // Es mejor hacer dos componentes diferentes. uno para matches finalizados y otro para los demas
            <div className="match">

                <div className="match_team">
                    <div className="match_country">
                        <img src={this.props.flag[0]} alt="" />
                        <p>{this.props.match.teamA}</p>
                    </div>
                    <p className="match_score">{this.scores && this.scores.scoreA}</p>
                </div>
                <div className="match_center">
                    <p>GRUPO {this.props.match.group}</p>
                    <p className="vs">vs</p>
                    <p className="time">{this.props.match.time}</p>
                </div>
                <div className="match_team">
                    <p className="match_score match_score_right">{this.scores && this.scores.scoreB}</p>
                    <div className="match_country">
                        <img src={this.props.flag[1]} alt="" />
                        <p>{this.props.match.teamB}</p>
                    </div>

                </div>
                {(this.scores && !this.props.match.finished )&&
                    <div className="ribbon"><span>enviado</span></div>
                }
                {this.props.match.finished &&
                    <div className="ribbon ribbon_pink"><span>finalizado</span></div>
                }

            </div>
        )
    }
}

const mapStateToProps = (state,props) =>{
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Match);