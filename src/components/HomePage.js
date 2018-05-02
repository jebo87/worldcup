import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { startSetMatches } from '../actions/matchesActions';
import Fecha from './Fecha';
import SendScoreModal from './SendScoreModal';
import {setScore} from '../actions/scoreActions';



class HomePage extends React.Component {


    loading = true;


    componentDidMount() {

        this.props.dispatch(startSetMatches());

    }
    resetScore=()=>{
        this.props.dispatch(setScore({teamA:"",teamB:"",group:"",scoreA:0,scoreB:0})); 

        
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
                    <SendScoreModal  resetScore={this.resetScore}/>
                    // <SendScoreModal  score = {{teamA:"uruguay",teamB:"egipto",group:"",scoreA:0,scoreB:0}} resetScore={this.resetScore}/>
                }
            </React.Fragment>
        )

    }

}
const mapStateToProps = (state, props) => {
    return {
        fechas: state.fechas,
        score:state.scoreToUpdate
    }

}

export default connect(mapStateToProps)(HomePage);