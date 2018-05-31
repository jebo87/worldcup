import React from 'react';
import {connect} from 'react-redux';
import Header from '../components/Header';
import database from '../helpers/database';
class AdminPage extends React.Component{

    render(){
        return (
            <React.Fragment>
                <Header history={this.props.history} />
                {console.log({...database})}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state,props)=>{
    return {
        'user':state.user
    }
}

export default connect()(AdminPage);