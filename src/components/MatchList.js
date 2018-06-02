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
        // this.state = {
        //     serverTime: undefined
        // }
    }

    componentDidMount = () => {
        //we need to get the server time to show the matches that are editable
        // fetch('https://us-central1-***REMOVED***.cloudfunctions.net/date?format=YYYY-MM-DD%20HH:mm')
        //     .then((response) => (response.json())) //this is the promise
        //     .then((responseJSON) => { //actual result
        //         let serverDate = responseJSON['formattedDate'];
        //         this.setState(() => ({ serverTime: moment(serverDate, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm') }))

        //     });



    }
    render() {
        if (this.props.serverTime) {
            return (
                <div>
                    <div className='match_list'>
                        {
                            this.matchKeys.map(
                                (thisMatch) => {
                                    return this.props.matches[thisMatch].finished ?
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

        // return (
        //     <div className='match_list'>
        //         {
        //             this.matchKeys.map(
        //                 (thisMatch) => (
        //                     <Match flag={
        //                         ['images/'+this.props.matches[thisMatch].teamA+'.png','images/'+this.props.matches[thisMatch].teamB+'.png']
        //                     }
        //                         match={this.props.matches[thisMatch]}
        //                         key={thisMatch}
        //                     />
        //                 )
        //             )
        //         }

        //     </div>
        // );


    }



}

const mapStateToProps = (state, props) => {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(MatchList);