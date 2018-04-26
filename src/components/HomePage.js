import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { startSetMatches } from '../actions/matchesActions';

class HomePage extends React.Component {

    componentWillMount() {
        this.props.dispatch(startSetMatches());
    }
    componentDidMount() {
        console.log(Object.keys(this.props.fechas));
    }
    render() {

        return (

            <div>
                <Header history={this.props.history} />
                {Object.keys(this.props.fechas).map((fecha) => (
                    <p>
                    {fecha}</p>
                ))
                }
            </div>
        )

    }

}
const mapStateToProps = (state, props) => {
    return {
        fechas: state.fechas
    }

}

export default connect(mapStateToProps)(HomePage);