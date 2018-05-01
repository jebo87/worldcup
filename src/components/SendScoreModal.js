import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
Modal.setAppElement('#app');
class SendScoreModal extends React.Component {

    constructor() {
        super();
        this.state = {
            width: window.innerWidth,
        };
    }
    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    // make sure to remove the listener
    // when the component is not mounted anymore
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };


    render() {
        const { width } = this.state;
        const isMobile = width < 640;
        console.log(width);

        if (!isMobile) {
            return (
                <Modal
                    isOpen={!!this.props.score.teamA}
                    onRequestClose={this.props.resetScore}
                    contentLabel="Selected Option"
                    closeTimeoutMS={1}
                    className="modal"
                >


                    <div className="score_box">
                        <div className="top_score_box">
                            <div className="flags">
                                <img src={'images/' + this.props.score.teamA + '.png'} alt="" />
                                <div>
                                    <div className="group">
                                       Grupo {' '+this.props.score.group}
                                    </div>
                                    <div className="vs">
                                        vs
                    </div>
                                </div>
                                <img src={'images/' + this.props.score.teamB + '.png'} alt="" />
                            </div>
                            <div className="scores_teams">
                                <span className="team_text teamA">{this.props.score.teamA}</span>
                                <div className="score">
                                    <a>&#60;</a>

                                    0
                            <a>&#62;</a>
                                </div>
                                <div className="middle">

                                    <div className="dash">
                                        &#45;
                                 </div>

                                </div>
                                <div className="score">
                                    <a>&#60;</a>
                                    0
                                 <a>&#62;</a>
                                </div>
                                <span className="team_text">{this.props.score.teamB}</span>
                            </div>


                        </div>


                        <button className="pink_button" >enviar pronostico</button>
                    </div>


                </Modal>
            );
        } else {
            return (
                <Modal
                    isOpen={!!this.props.score.teamA}
                    onRequestClose={this.props.resetScore}
                    contentLabel="Selected Option"
                    closeTimeoutMS={1}
                    className="modal_mobile"
                >
                <div className="layout">
                <span className="group">Grupo{' '+this.props.score.group}</span>
                        <div className="team">
                            <div className="textA">
                                {this.props.score.teamA}
                            </div>
                            <div className="flagMobile">
                                <img src={'images/' + this.props.score.teamA + '.png'} alt="" />
                            </div>
                            <div className="score">
                                <a>&#60;</a>

                                0
                                <a>&#62;</a>
                            </div>
                        </div>
                        <div className="middle">
                        <div className="vs">
                        VS
                        </div>
                        <div className="dash">
                        -
                        </div>
                        </div>
                        <div className="team">
                            <div className="textA">
                                {this.props.score.teamB}
                            </div>
                            <div className="flagMobile">
                                <img src={'images/' + this.props.score.teamB + '.png'} alt="" />
                            </div>
                            <div className="score">
                                <a>&#60;</a>

                                0
                                <a>&#62;</a>
                            </div>
                        </div>
                        <button className="pink_button" >enviar pronostico</button>
                    </div>



                </Modal>
            );
        }

    }
}

export default connect()(SendScoreModal);