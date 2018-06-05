import React from 'react';

const LeaderBoardItem = (props) => {
    console.log(props.user_score);
    return (
        <div className="lb_item">
            <div className="lb_number">
                {props.index}.
           </div>
           <div className="lb_square">
                <div className="lb_picture">
                <img src={props.user_score.image} alt=""/> 
                </div>
                <div className="lb_right">
                    <div className="lb_name">
                      {props.user_score.name}
                    </div>
                    <div className="lb_points">
                        <div className="lb_number_right">
                            {props.user_score.points}
                        </div>
                        <div className="lb_points_text">
                            puntos
                        </div>
                    </div>
                </div>
           </div>
        </div>
    );

}

export default LeaderBoardItem;