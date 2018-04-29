import React from 'react';
import { connect } from 'react-redux';
import { setUser, deleteUser } from '../actions/userActions';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayMenu: false
        }
    }
    logout = () => {
        localStorage.removeItem('worldcup_usr');
        this.props.dispatch(deleteUser());
        this.toggleMenu();
        this.props.history.push('/login');

    }
    toggleMenu = () => {
        
            const currentState = this.state.displayMenu;
            this.setState(() => ({ displayMenu: !currentState }));
       
    }
    render() {
        return (
            <React.Fragment >

                <div className={this.state.displayMenu ? 'header header_responsive ' : 'header header_normal'}>

                    <div>
                        <a href="#" onClick={this.toggleMenu} className="header_icon">&#9776;</a>
                        <span className="header_userleft">{this.props.user.userId}</span>
                    </div>
                    <NavLink onClick={this.toggleMenu} className="header_links" to="/" exact={true}>Inicio</NavLink>
                    <NavLink onClick={this.toggleMenu}  className="header_links" to="/points" >Puntos</NavLink>
                    <NavLink onClick={this.toggleMenu} className="header_links" to="/leaderboard" >Posiciones</NavLink>
                    <a className="header_links" href="#" onClick={this.logout} >Salir</a>
                    <span className="header_userright">{this.props.user.userId}</span>


                </div>
            </React.Fragment>
        );
    }
    componentWillMount() {
        if (!this.props.user.userId && !localStorage.getItem('worldcup_usr')) {
            this.props.history.push('/login');
        }

        if (localStorage.getItem('worldcup_usr') && !this.props.user.userId) {
            this.props.dispatch(setUser({ email: '', userId: localStorage.getItem('worldcup_usr') }));
        }

    }
}

const mapStateToProps = (state, props) => {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(Header);
