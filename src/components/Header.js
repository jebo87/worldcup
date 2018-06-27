import React from 'react';
import { connect } from 'react-redux';
import { setUser, deleteUser, startCheckAdmin } from '../actions/userActions';
import { NavLink } from 'react-router-dom';
import { firebaseApp } from '../helpers/database';
import database from '../helpers/database';
import ball from '../images/ball.png';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayMenu: false,
            displayAdminMenu: false
        }

    }



    logout = () => {
        this.setState(() => ({ displayMenu: false, displayAdminMenu: false }));
        this.props.dispatch(deleteUser());
        firebaseApp.auth().signOut().then(() => {
            //logged out
        }).catch(function (error) {
            console.log(error);
        });
        this.props.history.push('/login');


    }

    reload() {
        window.location.reload(true);
    }
    toggleMenu = () => {

        const currentState = this.state.displayMenu;
        this.setState(() => ({ displayMenu: !currentState }));

    }

    render() {

        return (
            

                <div className={this.state.displayMenu ? 'header header_responsive' : 'header header_normal'}>


                    <div className="header_userleft">
                        <a href="#" onClick={this.toggleMenu} className="header_icon">&#9776;</a>
                        <div className="name_pic">


                            {this.props.user.name || this.props.user.email}
                            {this.props.user.image && <img className="header_image" src={this.props.user.image || ball} alt="" />}
                        </div>
                    </div>

                    <div className="links_normal">
                        <NavLink className="header_links" to="/" exact={true}>Inicio</NavLink>

                        {this.props.user.userId && <NavLink className="header_links" to="/leaderboard" >Posiciones</NavLink>}

                        {this.props.user.userId && this.props.user.admin === true && <NavLink className="header_links" to="/admin" >Admin</NavLink>}
                        {this.props.user.userId && <a className="header_links" onClick={this.logout} style={{ cursor: 'pointer' }}>Salir</a>}
                    </div>




                    <div id="mySidenav" className={this.state.displayMenu ? 'sidenav sidenav_expanded' : 'sidenav'}>
                        <a href="javascript:void(0)" className="closebtn" onClick={this.toggleMenu}>&times;</a>
                        <NavLink onClick={this.toggleMenu} className="header_links" to="/" exact={true}>Inicio</NavLink>
                        {
                            //this.props.user.userId && <NavLink onClick={this.toggleMenu} className="header_links" to="/points" >Puntos</NavLink>
                        }
                        {this.props.user.userId && <NavLink onClick={this.toggleMenu} className="header_links" to="/leaderboard" >Posiciones</NavLink>}
                        {this.props.user.userId && this.props.user.admin === true && <NavLink onClick={this.toggleMenu} className="header_links" to="/admin" >Admin</NavLink>}
                        {this.props.user.userId && <a className="header_links" onClick={this.logout} style={{ cursor: 'pointer' }}>Salir</a>}

                    </div>


                    <div className="header_userright">



                        {this.props.user.name || this.props.user.email}
                        {this.props.user.image && <img className="header_image" src={this.props.user.image || ball} alt="" />}

                    </div>




                </div>
           
        );
    }
    unsubscribe = undefined;
    componentDidMount() {

        const myDatabase = database;
        this.unsubscribe = firebaseApp.auth().onAuthStateChanged((user) => {

            if (user) {

                //We have to set the props so that the matches will show the results

                let myUser = {
                    email: user.email,
                    userId: user.uid,
                    name: user.displayName,
                    image: user.photoURL,
                    admin: false
                }
                this.props.dispatch(setUser(myUser));
                this.props.dispatch(startCheckAdmin(user));



            } else {
                this.props.history.push('/login');
            }
        });


    }

    componentWillUnmount() {
        console.log('entro');
        this.unsubscribe();
    }

}

const mapStateToProps = (state, props) => {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(Header);
