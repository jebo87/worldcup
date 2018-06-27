import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import database from '../helpers/database';
import { startSetMatches } from '../actions/matchesActions';
import moment from 'moment';
import FechaAdmin from './admin/FechaAdmin';
import flags from '../helpers/flags';

class AdminPage extends React.Component {
    matchDates = [];
    constructor(props) {
        super(props);
        this.state = {

            groups_hidden: true
        }

    }
    toggleGroups = () => {
        this.setState(() => ({ groups_hidden: !this.state.groups_hidden }))
    }
    componentDidMount() {
        if (this.props.user) {
            if (!this.props.user.admin) {
                this.props.history.push('/');
            }
        }



        if (this.matchDates.length === 0) {
            this.props.dispatch(startSetMatches());
        }


    }

    render() {



        this.matchDates = Object.keys(this.props.fechas);
        return (
            <React.Fragment>

                <Header history={this.props.history} />

                <div className="admin">
                    <h1>Actualizar marcadores globales</h1>
                </div>
                <div className="admin_scores">
                    <p> Hola {(this.props.user.name) && (this.props.user.name).split(' ')[0]}, al actualizar estos marcadores los puntos para los usuarios van a ser actualizados
             </p>
                    <div className="home_page">
                        <div className="group_phase">
                            <span>Ocultar fase de grupos</span>

                            <label className="switch">
                                <input onChange={this.toggleGroups} type="checkbox" checked={this.state.groups_hidden} />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>
                    <div className="admin_matches">
                        {this.matchDates.map((fecha) => {
                            if (this.state.groups_hidden && (!this.props.fechas[fecha].phase || this.props.fechas[fecha].phase === "one")) {
                                return false;

                            } else {
                                return (<FechaAdmin phase={this.props.fechas[fecha].phase} matches={this.props.fechas[fecha].matches} fecha={fecha} key={fecha} flags={flags} />)

                            }
                        })}

                    </div>

                </div>

            </React.Fragment>
        );

    }
}

const mapStateToProps = (state, props) => {
    return {
        'user': state.user,
        'fechas': state.fechas
    }
}

export default connect(mapStateToProps)(AdminPage);