import React from 'react';
import { connect } from 'react-redux'
import { firebaseApp } from '../helpers/database';
import { mapTo } from 'rxjs/operators';
import { setUser } from '../actions/userActions';
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

        firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                this.props.dispatch(setUser({ email: user.email, userId: user.uid }));
                localStorage.setItem('worldcup_usr',user.uid);
                this.props.history.push('/');
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode, errorMessage);
                // ...
            });

    }
    handleEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({ user: { ...this.state.user,email } }));
    };
    handlePasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({ user: { ...this.state.user, password } }));
    };
    componentDidMount() {

    }
    render() {
        return (
            <div>
                <form onSubmit={this.login}>
                    <input type="text" id="email" value={this.state.user.email} onChange={this.handleEmailChange} />
                    <input type="password" id="password" value={this.state.user.password} onChange={this.handlePasswordChange} />
                    <button>Login</button>
                </form>



            </div>
        )
    }

}



export default connect()(Login);
