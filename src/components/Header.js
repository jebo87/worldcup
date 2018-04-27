import React from 'react';
import { connect } from 'react-redux';
import {setUser} from '../actions/userActions';

class Header extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>Header - Welcome {this.props.user.userId}</div>
        );
    }
    componentWillMount() {
         if (!this.props.user.userId&&!localStorage.getItem('worldcup_usr')) {
             this.props.history.push('/login');
            }
         
             if(localStorage.getItem('worldcup_usr')&&!this.props.user.userId){
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
