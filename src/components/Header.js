import React from 'react';
import { connect } from 'react-redux';
import { setUser, deleteUser } from '../actions/userActions';
import { NavLink } from 'react-router-dom';
import { firebaseApp } from '../helpers/database';
import ball from '../images/ball.png';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayMenu: false
        }
    }
    logout = () => {
        this.setState(() => ({ displayMenu: false }));
        this.props.dispatch(deleteUser());
        firebaseApp.auth().signOut().then(() => {
            // Sign-out successful.
            console.log('sign out');
        }).catch(function (error) {
            console.log(error);
        });
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
                        <span className="header_userleft">{this.props.user.name || this.props.user.email}</span>
                    </div>
                    <div className="links_normal">
                        <NavLink className="header_links" to="/" exact={true}>Inicio</NavLink>
                        <NavLink className="header_links" to="/points" >Puntos</NavLink>
                        <NavLink className="header_links" to="/leaderboard" >Posiciones</NavLink>
                    </div>
                    <div className="links_responsive">
                        <NavLink onClick={this.toggleMenu} className="header_links" to="/" exact={true}>Inicio</NavLink>
                        <NavLink onClick={this.toggleMenu} className="header_links" to="/points" >Puntos</NavLink>
                        <NavLink onClick={this.toggleMenu} className="header_links" to="/leaderboard" >Posiciones</NavLink>

                    </div>
                    <a className="header_links" onClick={this.logout} style={{cursor:'pointer'}}>Salir</a>
                    {
                        this.props.user.email && <img className="header_image" src={this.props.user.image || ball} alt="" />

                    }

                    <div className="header_userright">

                        {this.props.user.name || this.props.user.email}

                    </div>


                </div>
            </React.Fragment>
        );
    }
    componentDidMount() {
        firebaseApp.auth().onAuthStateChanged((user) => {

            if (user) {
                this.props.dispatch(setUser(
                    {
                        email: user.email,
                        userId: user.uid,
                        name: user.displayName,
                        image: user.photoURL
                    }
                ));

            } else {
                this.props.history.push('/login');
            }
        });
    }
}

const mapStateToProps = (state, props) => {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(Header);
