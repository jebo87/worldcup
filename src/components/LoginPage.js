import React from 'react';
import Login from './Login';
import Header from './Header';
import { connect } from 'react-redux';
import { setUser } from '../actions/userActions';


const LoginPage = (props) => {
    return (
        <React.Fragment>
            <Header history={props.history}/>

            <div className="login_page">
                <h2>BIENVENIDO A RUSIA 2018</h2>
                <div className="login">
                    <div className="login_left">
                        <button className="loginBtn loginBtn--facebook">Iniciar con Facebook</button>
                        <button className="loginBtn loginBtn--google">Iniciar con Google </button>
                    </div>
                    <div className="login_right">
                        <Login onSubmit={(user) => {
                            props.dispatch(setUser({ email: user.email, userId: user.uid }));
                            localStorage.setItem('worldcup_usr', user.uid);
                            props.history.push('/');
                        }} />
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
}
export default connect()(LoginPage);
