import React from 'react';
import { startSetMatchScore, startToggleFinished } from '../../actions/matchesActions';
import { uploadPoints } from '../../actions/scoreboardActions';
import { connect } from 'react-redux';
import database from '../../helpers/database';

class MatchAdmin extends React.Component {
    match = undefined;
    finished = undefined;

    toggleFinished = () => {
        const updateFinished = {
            fecha: this.props.fecha,
            matchId: this.props.matchId,
            finished: this.props.match['match_score'].finished

        };
        this.props.dispatch(startToggleFinished(updateFinished));
    }

    updateScore = () => {

        this.matchToUpdate = {
            fecha: this.props.fecha,
            matchId: this.props.matchId,
            scoreA: this.state.scoreA,
            scoreB: this.state.scoreB
        };
        this.props.dispatch(startSetMatchScore(this.matchToUpdate));

        database.ref(`fechas/${this.matchToUpdate.fecha}/matches/${this.matchToUpdate.matchId}`).once('value', (snapshot) => {
            let match = {};
            match = snapshot.val();
            const match_score = match.match_score;
            if (match.scores) {
                const scores = Object.keys(match.scores);
                const point_phase ={
                    "one":{
                        "result_ok":5,
                        "winning_team":2,
                        "nothing":0
                    },
                    "two":{
                        "result_ok":5,
                        "winning_team":3,
                        "nothing":0
                    },
                    "three":{
                        "result_ok":8,
                        "winning_team":5,
                        "nothing":0
                    },
                    "four":{
                        "result_ok":10,
                        "winning_team":8,
                        "nothing":0
                    },
                    "five":{
                        "result_ok":10,
                        "winning_team":8,
                        "nothing":0
                    }
                }

                scores.map((score) => {
                    let points = 0;
                    // console.log(match_score.scoreA + ' - ' + match_score.scoreB+'vs '+match.scores[score].scoreA +' - '+match.scores[score].scoreB);
                    points = ((match.scores[score].scoreA == match_score.scoreA) &&
                        (match.scores[score].scoreB == match_score.scoreB)) ? point_phase[this.props.phase]['result_ok'] :
                        (
                            match.scores[score].scoreA > match.scores[score].scoreB
                                && match_score.scoreA > match_score.scoreB ?  point_phase[this.props.phase]['winning_team'] : (
                                    match.scores[score].scoreB > match.scores[score].scoreA
                                        && match_score.scoreB > match_score.scoreA ?  point_phase[this.props.phase]['winning_team'] : (match.scores[score].scoreA == match.scores[score].scoreB
                                            && match_score.scoreA == match_score.scoreB) ?  point_phase[this.props.phase]['winning_team'] :  point_phase[this.props.phase]['nothing']
                                )
                        )
                    match.scores[score]['points'] = points;


                });
                //update database
                database.ref(`fechas/${this.matchToUpdate.fecha}/matches/${this.matchToUpdate.matchId}`).set(
                    { ...match }
                ).then(() => {
                    this.props.dispatch(uploadPoints());
                })

                return match;
            } else {
                return match;
            }
        });

    }
    constructor(props) {
        super(props);



        this.state = {
            scoreA: this.props.match['match_score'].scoreA,
            scoreB: this.props.match['match_score'].scoreB
        }


    }
    onScoreAChange = (e) => {
        const newVal = parseInt(e.target.value);
        if (/^[0-9]\d*$/.test(newVal)) {
            this.setState(() => ({ scoreA: newVal }));
        }
    }
    onScoreBChange = (e) => {
        const newVal = parseInt(e.target.value);
        if (/^[0-9]\d*$/.test(newVal)) {
            this.setState(() => ({ scoreB: newVal }));
        }
    }

    render() {

        return (
            <div className="match_admin" >


                <div className="match_admin_time">
                    {this.props.match['match_score'].finished && <button onClick={this.toggleFinished} className="flame_buttom" >🔥</button>}

                    {this.props.match.time}
                </div>

                <div className="match_admin_country">

                    <img src={'images/' + this.props.match.teamA + '.png'} alt="" />
                    <input type="number" defaultValue={this.props.match['match_score'].scoreA} onChange={this.onScoreAChange} />
                    {this.props.match.teamA}
                </div>
                <div className="match_admin_vs">
                    vs
            </div>
                <div className="match_admin_country">

                    <img src={'images/' + this.props.match.teamB + '.png'} alt="" />
                    <input type="number" defaultValue={this.props.match['match_score'].scoreB} onChange={this.onScoreBChange} />
                    {this.props.match.teamB}
                </div>

                <button className="match_admin_button" onClick={this.updateScore}>OK</button>



            </div>
        )

    }
}

const mapStateToProps = (state, props) => {
    return {
        user: state.user,
    }

}

export default connect(mapStateToProps)(MatchAdmin);