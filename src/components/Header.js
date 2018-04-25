import React from 'react';
import { connect } from 'react-redux';

export const Header = (props) => (
    <div>Header - Welcome {props.user.email}</div>
);

const mapStateToProps = (state, props) => {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(Header);
