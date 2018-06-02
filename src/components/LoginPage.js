import React from 'react';
import Login from './Login';
import Header from './Header';
import { connect } from 'react-redux';
import { setUser } from '../actions/userActions';
import { firebaseApp, googleProvider, firebaseAuth, facebookProvider } from '../helpers/database';
import database from '../helpers/database';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: undefined
        }

    }

    loginGoogle = () => {

        firebaseApp.auth().setPersistence(firebaseAuth.Auth.Persistence.SESSION).then(() => {
            firebaseApp.auth().signInWithPopup(googleProvider).then((result) => {

                // This gives you a Google Access Token. You can use it to access the Google API.
                const token = result.credential.accessToken;
                // The signed-in user info.
                const user = result.user;

                this.onLogin(user);



            })

        })
            .catch(function (error) {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                const credential = error.credential;
                // ...
            });
    }
    loginFacebook = () => {
        facebookProvider.addScope('email');
        facebookProvider.addScope('public_profile');


        firebaseApp.auth().setPersistence(firebaseAuth.Auth.Persistence.SESSION).then(() => {
            return firebaseApp.auth().signInWithPopup(facebookProvider).then((result) => {

                // This gives you a Google Access Token. You can use it to access the Google API.
                const token = result.credential.accessToken;
                // The signed-in user info.
                const user = result.user;



                

                this.onLogin(user);



            })

        })
            .catch((error) => {
                console.log(error);
                // Handle Errors here.
                const errorCode = error.code;

                if (errorCode === 'auth/account-exists-with-different-credential') {
                    this.setState(() => ({ error: 'Este email fue configurado para ingresar con Google. Por favor usa el botón "Iniciar con Google"' }))
                }
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                const credential = error.credential;
                // ...
            });
    }
    onLogin = (user) => {

        database.ref('users/' + user.uid).once('value').then((snapshot) => {
            let myUser = {
                email: user.email,
                userId: user.uid,
                name: user.displayName,
                image: user.photoURL,
                admin: false
            };
            if (snapshot.val() === 'admin') {
                myUser.admin = true;
            }

            return myUser;

        }).then((myUser) => {
            this.props.dispatch(setUser(myUser));
        }).then(() => {
            this.props.history.push('/');

        });



    }

    componentDidMount() {

    }
    componentWillMount() {
        if (!!this.props.user.email) {
            this.props.history.push('/');
        }

        if (localStorage.getItem('worldcup_login_started') === 'yes') {
            this.setState(() => ({ loginInitiated: true }));
        }
    }
    render() {


        return (
            <React.Fragment>
                <Header history={this.props.history} />

                <div className="login_page">
                    <h2>BIENVENIDO A RUSIA 2018</h2>
                    <div className="login">
                        <div className="login_error">
                            {this.state.error}
                        </div>
                        <div className="login_wrapper">

                            <div className="login_left">
                                <button onClick={this.loginFacebook} className="loginBtn loginBtn--facebook">Iniciar con Facebook</button>
                                <button onClick={this.loginGoogle} className="loginBtn loginBtn--google">Iniciar con Google </button>
                            </div>
                            <div className="login_right">
                                <Login onSubmit={this.onLogin} />
                            </div>
                        </div>

                    </div>

                </div>

            </React.Fragment>
        )
    }
};

const mapStateToProps = (state, props) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(LoginPage);
