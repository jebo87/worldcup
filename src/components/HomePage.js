import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { setMatches, startSetMatches } from '../actions/matchesActions';
import Fecha from './Fecha';
import SendScoreModal from './SendScoreModal';
import { setScore } from '../actions/scoreActions';
import database from '../helpers/database';


class HomePage extends React.Component {


    loading = true;


    componentDidMount() {
        database.ref('fechas').on('value', (snapshot) => {
            let fechas = {};
            fechas = snapshot.val();


            console.log(this.props.user);
            let filteredFechas = Object.values(fechas).map(fecha => {
                return Object.values(fecha.matches).map(match => {


                    if (match.scores) {

                        let newArray = Object.keys(match.scores).filter(score => {

                            if (score === this.props.user.userId) {

                                return true;
                            }
                            return false;
                        });
                        return newArray;
                    }
                });
            });
            this.props.dispatch(setMatches(fechas));
        });
        // this.props.dispatch(startSetMatches());

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

                        <Fecha matches={this.props.fechas[fecha].matches} fecha={fecha} key={fecha} />

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