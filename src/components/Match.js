import React from 'react';
import { connect } from 'react-redux';
import {setScore} from '../actions/scoreActions';

class Match extends React.Component {
    user = this.props.user.userId;
   constructor(props){
       super(props);
       this.scores = undefined;
   }
    handleClick = () => {

        const score = { 
            user:this.props.user.userId,
            fecha:this.props.fecha, 
            matchId:this.props.matchId, 
            group: this.props.match.group, 
            teamA: this.props.match.teamA, 
            teamB: this.props.match.teamB, 
            scoreA:(this.scores && this.scores.scoreA)||0,
            scoreB:(this.scores && this.scores.scoreB)||0 
        };
        this.props.dispatch(setScore(score));
    }
    componentDidMount(){
        
    }
    render() {
        this.scores = this.props.match.scores ? this.props.match.scores[this.user] : undefined;
        return (
            // Es mejor hacer dos componentes diferentes. uno para matches finalizados y otro para los demas
            <div className="match" onClick={this.handleClick}>

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
                {(this.scores && !this.props.match.finished) &&
                    <div className="ribbon"><span>enviado</span></div>
                }
                {this.props.match.finished &&
                    <div className="ribbon ribbon_pink"><span>finalizado</span></div>
                }

            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        user: state.user,
        score: state.score
    }
}

export default connect(mapStateToProps)(Match);