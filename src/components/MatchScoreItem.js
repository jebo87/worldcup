import React from 'react';
const MatchScoreItem =(props) => {
    return (
        <div className="ms_score" >
            <div className="ms_user_box" >

                <img className="ms_avatar" src={props.matchScore.picture + "?height=100&width=100"} alt="" />

                <div className="ms_name">

                    {props.matchScore.name}
                </div>
            </div>
            <div className="ms_score_box">
                <img src={'images/' + props.matchInfo.teamA + '.png'} alt="" />
                {props.matchScore.scoreA} - {props.matchScore.scoreB}
                <img src={'images/' + props.matchInfo.teamB + '.png'} alt="" />
            </div>
        </div>
    )
}

export default MatchScoreItem;