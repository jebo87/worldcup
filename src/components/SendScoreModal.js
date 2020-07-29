import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { setScore, startSetScore } from '../actions/scoreActions';
import moment from 'moment';

Modal.setAppElement('#root');
class SendScoreModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			width: window.innerWidth,
			scoreA: 0,
			scoreB: 0,
			matchEnabled: true
		};
	}
	componentWillMount() {}

	componentDidMount() {
		window.addEventListener('resize', this.handleWindowSizeChange);
	}

	handleWindowSizeChange = () => {
		this.setState({ width: window.innerWidth });
	};

	removeGoal = (team) => {
		team === 'A'
			? this.setState(() => ({ scoreA: this.state.scoreA > 0 ? --this.state.scoreA : 0 }))
			: this.setState(() => ({ scoreB: this.state.scoreB > 0 ? --this.state.scoreB : 0 }));
	};
	addGoal = (team) => {
		team === 'A'
			? this.setState(() => ({ scoreA: this.state.scoreA + 1 }))
			: this.setState(() => ({ scoreB: this.state.scoreB + 1 }));
	};

	sendScore = () => {
		this.props.dispatch(
			startSetScore({ ...this.props.score, scoreA: this.state.scoreA, scoreB: this.state.scoreB })
		);
		this.setState(() => ({
			scoreA: 0,
			scoreB: 0
		}));
		this.props.resetScore();
	};

	afterModalOpen = () => {
		this.props.score.scoreA !== 0
			? this.setState(() => ({ scoreA: this.props.score.scoreA }))
			: this.setState(() => ({ scoreA: 0 }));
		this.props.score.scoreB !== 0
			? this.setState(() => ({ scoreB: this.props.score.scoreB }))
			: this.setState(() => ({ scoreB: 0 }));
		fetch('https://us-central1-***REMOVED***.cloudfunctions.net/date?format=YYYY-MM-DD%20HH:mm')
			.then((response) => response.json()) //this is the promise
			.then((responseJSON) => {
				//actual result
				let serverDate = responseJSON['formattedDate'];
				const serverTime = moment('' + serverDate, 'YYYY-MM-DD HH:mm');
				const matchTime = moment(this.props.score.fecha + ' ' + this.props.score.time, 'YYYY-MM-DD HH:mm');

				if (serverTime.isSameOrBefore(matchTime)) {
					this.setState(() => ({ matchEnabled: true }));
				} else {
					this.setState(() => ({ matchEnabled: false }));
				}
			});
	};
	render() {
		const { width } = this.state;
		const isMobile = width < 640;
		if (this.state.matchEnabled) {
			if (!isMobile) {
				return (
					<Modal
						isOpen={!!this.props.score.teamA}
						onAfterOpen={this.afterModalOpen}
						onRequestClose={() => {
							console.log('closing');
							this.setState(() => ({
								scoreA: 0,
								scoreB: 0
							}));
							this.props.resetScore();
						}}
						contentLabel="Selected Option"
						closeTimeoutMS={1}
						className="modal"
					>
						<div className="score_box">
							<div className="top_score_box">
								<div className="flags">
									<img src={'images/' + this.props.score.teamA + '.png'} alt="" />
									<div>
										<div className="group">Grupo {' ' + this.props.score.group}</div>
										<div className="vs">vs</div>
									</div>
									<img src={'images/' + this.props.score.teamB + '.png'} alt="" />
								</div>
								<div className="scores_teams">
									<span className="team_text teamA">{this.props.score.teamA}</span>
									<div className="score">
										<a
											className="scorelink"
											onClick={(e) => {
												this.removeGoal('A');
											}}
										>
											&#60;
										</a>
										<div className="number">
											<TransitionGroup component="span" className="score_number">
												<CSSTransition
													classNames="score_number"
													key={this.state.scoreA}
													timeout={{ enter: 500, exit: 50 }}
												>
													<span>{this.state.scoreA}</span>
												</CSSTransition>
											</TransitionGroup>
										</div>
										<a
											className="scorelink"
											onClick={(e) => {
												this.addGoal('A');
											}}
										>
											&#62;
										</a>
									</div>
									<div className="middle">
										<div className="dash">&#45;</div>
									</div>
									<div className="score">
										<a
											className="scorelink"
											onClick={(e) => {
												this.removeGoal('B');
											}}
										>
											&#60;
										</a>
										<div className="number">
											<TransitionGroup component="span" className="score_number">
												<CSSTransition
													classNames="score_number"
													key={this.state.scoreB}
													timeout={{ enter: 500, exit: 50 }}
												>
													<span>{this.state.scoreB}</span>
												</CSSTransition>
											</TransitionGroup>
										</div>
										<a
											className="scorelink"
											onClick={(e) => {
												this.addGoal('B');
											}}
										>
											&#62;
										</a>
									</div>
									<span className="team_text">{this.props.score.teamB}</span>
								</div>
							</div>

							<button className="pink_button" onClick={this.sendScore}>
								enviar pronostico
							</button>
						</div>
					</Modal>
				);
			} else {
				return (
					<Modal
						isOpen={!!this.props.score.teamA}
						onRequestClose={() => {
							this.setState(() => ({
								scoreA: 0,
								scoreB: 0
							}));
							this.props.resetScore();
						}}
						onAfterOpen={this.afterModalOpen}
						contentLabel="Selected Option"
						closeTimeoutMS={1}
						className="modal_mobile"
					>
						<div className="layout">
							<span className="group">Grupo{' ' + this.props.score.group}</span>
							<div className="team">
								<div className="textA">{this.props.score.teamA}</div>
								<div className="flagMobile">
									<img src={'images/' + this.props.score.teamA + '.png'} alt="" />
								</div>
								<div className="score">
									<a
										className="scorelink"
										onClick={(e) => {
											this.removeGoal('A');
										}}
									>
										&#60;
									</a>
									<div className="number">
										<TransitionGroup component="span" className="score_number">
											<CSSTransition
												classNames="score_number"
												key={this.state.scoreA}
												timeout={{ enter: 500, exit: 50 }}
											>
												<span>{this.state.scoreA}</span>
											</CSSTransition>
										</TransitionGroup>
									</div>
									<a
										className="scorelink"
										onClick={(e) => {
											this.addGoal('A');
										}}
									>
										&#62;
									</a>
								</div>
							</div>
							<div className="middle">
								<div className="vs">VS</div>
							</div>
							<div className="team">
								<div className="textA">{this.props.score.teamB}</div>
								<div className="flagMobile">
									<img src={'images/' + this.props.score.teamB + '.png'} alt="" />
								</div>
								<div className="score">
									<a
										className="scorelink"
										onClick={(e) => {
											this.removeGoal('B');
										}}
									>
										&#60;
									</a>
									<div className="number">
										<TransitionGroup component="span" className="score_number">
											<CSSTransition
												classNames="score_number"
												key={this.state.scoreB}
												timeout={{ enter: 500, exit: 50 }}
											>
												<span>{this.state.scoreB}</span>
											</CSSTransition>
										</TransitionGroup>
									</div>
									<a
										className="scorelink"
										onClick={(e) => {
											this.addGoal('B');
										}}
									>
										&#62;
									</a>
								</div>
							</div>
							<button className="pink_button" onClick={this.sendScore}>
								enviar pronostico
							</button>
						</div>
					</Modal>
				);
			}
		} else {
			return (
				<Modal
					isOpen={!!this.props.score.teamA}
					onRequestClose={() => {
						this.setState(() => ({ matchEnabled: true }));
						this.setState(() => ({
							scoreA: 0,
							scoreB: 0
						}));
						this.props.resetScore();
					}}
					contentLabel="Selected Option"
					closeTimeoutMS={1}
					className="modal"
				>
					<div className="layout">El partido ya ha comenzado!</div>
				</Modal>
			);
		}
	}
}
const mapStateToProps = (state, props) => {
	return {
		score: state.scoreToUpdate
	};
};
export default connect(mapStateToProps)(SendScoreModal);
