import React from 'react';
import { connect } from 'react-redux';
import Match from '../components/Match';
import MatchCompleted from '../components/MatchCompleted';
import flags from '../helpers/flags';
import moment from 'moment';

class MatchList extends React.Component {
    matchKeys = Object.keys(this.props.matches);
    flagKeys = Object.keys({ ...flags });
    constructor(props) {
        super(props);
      
    }

    render() {
        if (this.props.serverTime) {
            return (
                <div>
                    <div className='match_list'>
                        {
                            this.matchKeys.map(
                                (thisMatch) => {
                                    return this.props.matches[thisMatch]['match_score'].finished ?
                                        (<MatchCompleted flag={
                                            ['images/' + this.props.matches[thisMatch].teamA + '.png', 'images/' + this.props.matches[thisMatch].teamB + '.png']
                                        }
                                            match={this.props.matches[thisMatch]}

                                            key={thisMatch}
                                        />) :
                                        (<Match flag={
                                            ['images/' + this.props.matches[thisMatch].teamA + '.png', 'images/' + this.props.matches[thisMatch].teamB + '.png']
                                        }
                                            match={this.props.matches[thisMatch]}
                                            fecha={this.props.fecha}
                                            matchId={thisMatch}
                                            key={thisMatch}
                                            serverTime={this.props.serverTime}
                                        />)
                                }
                            )
                        }

                    </div>
                </div>
            )
        }else{
            return <div>loading...</div>
        }

        

    }



}

const mapStateToProps = (state, props) => {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(MatchList);