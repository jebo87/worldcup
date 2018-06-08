import React from 'react';
import {connect} from 'react-redux';
import LeaderBoardItem from './LeaderBoardItem';
import {startLoadUserScores} from '../actions/scoreboardActions';
import Header from './Header';

class LeaderBoardPage extends React.Component {
    constructor(props){
        super(props);
        this.userScores = {}
    }
    componentDidMount(){
        this.props.dispatch(startLoadUserScores());
        
        
       
    }
    render() {
       

        return (<React.Fragment>
            <Header history={this.props.history} />
            <div className="leaderboard">
                <div className="lb_title">
                    <h1>tabla de posiciones</h1>
                </div>
                <div className="lb_table">
                {
                    Object.keys(this.props.user_scores).length === 0 ? <img src="images/logo.png" alt=""/> :
                    (this.props.user_scores && (
                        Object.keys(this.props.user_scores).map((score,index) =>{
                            return (<LeaderBoardItem key={score} user_score={this.props.user_scores[score]} index={index+1}/>)
                        })
                    ) )
                }
               
                

                    
                </div>
            </div>

        </React.Fragment>);
    }
}
const mapStateToProps = (state,props) =>{
    return {
       
        user_scores: state.user_scores
    }
}
export default connect(mapStateToProps)(LeaderBoardPage)