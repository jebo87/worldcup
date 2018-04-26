import React from 'react';
import {connect} from 'react-redux';
import matches from '../helpers/schedule_dummy';
import Match from '../components/Match';
import flags from '../helpers/flags';

class MatchList extends React.Component {
    matchKeys = Object.keys({ ...matches });
    flagKeys = Object.keys({ ...flags });
    constructor(props){
        super(props);
    }
    componentWillMount(){
        if(!this.props.user.userId){
            this.props.history.push('/login');
        }
    }
    componentDidMount(){
        this.replaceFlags();
        console.log(this.flagKeys);
        console.log(matches);
    }
    render() {



        return (
            <div className='match_list'>
                {
                    this.matchKeys.map(
                        (thisMatch) => (
                            <Match flag={
                                ['images/'+matches[thisMatch].teamA+'.png','images/'+matches[thisMatch].teamB+'.png']
                            }
                                match={matches[thisMatch]}
                                key={thisMatch}
                            />
                        )
                    )
                }
                
            </div>
        );


    }

    replaceFlags(teamA,teamB){
        if (teamA === 'espana')
            teamA='espania'
       
    }

}

const mapStateToProps = (state,props) =>{
    return{
        user: state.user
    };
}

export default connect(mapStateToProps)(MatchList);