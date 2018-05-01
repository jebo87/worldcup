import React from 'react';
import { firebaseApp,firebaseAuth } from '../helpers/database';
import username from '../images/user.png';
import password from '../images/password.png';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: 'jebo87@gmail.com',
                password: 'bautista87',

            }
        };

    }


    login = (e) => {
        e.preventDefault();

        const email = this.state.user.email;
        const password = this.state.user.password;
        const props = this.props;
        firebaseApp.auth().setPersistence(firebaseAuth.Auth.Persistence.SESSION).then(()=>{
            return firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                this.props.onSubmit(
                    user
                )
            })

        })
        // .catch(function (error) {
        //     // Handle Errors here.
        //     var errorCode = error.code;
        //     var errorMessage = error.message;

        //     console.log(errorCode, errorMessage);
        //     // ...
        // });

    }
    handleEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({ user: { ...this.state.user, email } }));
    };
    handlePasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({ user: { ...this.state.user, password } }));
    };
    componentDidMount() {

    }
    render() {
        return (
            <React.Fragment >
                <form onSubmit={this.login} className="login-box">
                    <div className="input_login">
                        <input type="text" id="email" value={this.state.user.email} onChange={this.handleEmailChange} />
                    </div>
                    <div className="input_login input_login--password">
                        <input type="password" id="password" value={this.state.user.password} onChange={this.handlePasswordChange} />
                    </div>
                    <button className="pink_button">Login</button>
                </form>



            </React.Fragment>
        )
    }

}



export default Login;
