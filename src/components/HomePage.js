import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { startSetMatches } from '../actions/matchesActions';
import Fecha from './Fecha';

class HomePage extends React.Component {


    loading = true;


    componentDidMount() {

        this.props.dispatch(startSetMatches());

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

            </React.Fragment>
        )

    }

}
const mapStateToProps = (state, props) => {
    return {
        fechas: state.fechas
    }

}

export default connect(mapStateToProps)(HomePage);