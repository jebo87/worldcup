import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>Header - Welcome {this.props.user.email}</div>
        );
    }
    componentWillMount() {
        if (!this.props.user.userId) {
            this.props.history.push('/login');
        }
    }
}

const mapStateToProps = (state, props) => {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(Header);
