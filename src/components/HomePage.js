import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { setMatches, startSetMatches } from '../actions/matchesActions';
import Fecha from './Fecha';
import SendScoreModal from './SendScoreModal';
import { setScore } from '../actions/scoreActions';
import database from '../helpers/database';
import moment from 'moment';
class HomePage extends React.Component {


    loading = true;

    constructor(props){
        super(props);
        this.state = {
            serverTime: undefined
        }
    }


    componentDidMount() {
       this.props.dispatch(startSetMatches());
       
       
          fetch('https://us-central1-***REMOVED***.cloudfunctions.net/date?format=YYYY-MM-DD%20HH:mm')
            .then((response) => (response.json())) //this is the promise
            .then((responseJSON) => { //actual result
                let serverDate = responseJSON['formattedDate'];
                this.setState(() => ({ serverTime: moment(serverDate, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm') }))
                console.log(serverDate);
            });

            

    }
    componentWillReceiveProps() {

    }
    resetScore = () => {
        console.log('closing');
        this.props.dispatch(setScore({ teamA: "", teamB: "", group: "", scoreA: 0, scoreB: 0}));


    }
    render() {
        const matchDates = Object.keys(this.props.fechas);
        return (

            <React.Fragment>
                <Header history={this.props.history} />
                {matchDates.length === 0 ? (<p> loading... </p>) :


                    matchDates.map((fecha) => (

                        <Fecha matches={this.props.fechas[fecha].matches} fecha={fecha} key={fecha} serverTime={this.state.serverTime}/>

                    ))
                }
                {
                    <SendScoreModal resetScore={this.resetScore} />
                    // <SendScoreModal  score = {{teamA:"uruguay",teamB:"egipto",group:"",scoreA:0,scoreB:0}} resetScore={this.resetScore}/>
                }
            </React.Fragment>
        )

    }

}
const mapStateToProps = (state, props) => {
    return {
        fechas: state.fechas,
        score: state.scoreToUpdate,
        user: state.user
    }

}

export default connect(mapStateToProps)(HomePage);