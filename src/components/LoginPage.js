import React from 'react';
import Login from './Login';
import Header from './Header';
import { connect } from 'react-redux';
import { setUser } from '../actions/userActions';
import { firebaseApp, googleProvider,firebaseAuth } from '../helpers/database';

class LoginPage extends React.Component {

    loginGoogle = () => {
        firebaseApp.auth().setPersistence(firebaseAuth.Auth.Persistence.SESSION).then(()=>{
            return firebaseApp.auth().signInWithPopup(googleProvider).then( (result) => {
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
        console.log('loggin with facebook');
    }
    onLogin = (user) => {
        console.log(user);
        this.props.dispatch(setUser(
            {
                email: user.email,
                userId: user.uid,
                name: user.displayName,
                image: user.photoURL
            }
        ));
        // localStorage.setItem('worldcup_usr', user.uid);
        this.props.history.push('/');
    }
    render() {
        return (
            <React.Fragment>
                <Header history={this.props.history} />

                <div className="login_page">
                    <h2>BIENVENIDO A RUSIA 2018</h2>
                    <div className="login">
                        <div className="login_left">
                            <button onClick={this.loginFacebook} className="loginBtn loginBtn--facebook">Iniciar con Facebook</button>
                            <button onClick={this.loginGoogle} className="loginBtn loginBtn--google">Iniciar con Google </button>
                        </div>
                        <div className="login_right">
                            <Login onSubmit={this.onLogin} />
                        </div>
                    </div>

                </div>
            </React.Fragment>
        )
    }
}
export default connect()(LoginPage);
