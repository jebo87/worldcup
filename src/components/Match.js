import React from 'react';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import { setScore } from '../actions/scoreActions';
import moment from 'moment';
import { startSetMatchScore } from '../actions/matchScoreActions';

class Match extends React.Component {
	user = this.props.user.userId;
	constructor(props) {
		super(props);
		this.scores = undefined;
		this.state = {
			matchEnabled: true
		};
	}

	loadMatchScores = () => {
		console.log(this.props.match);
		this.props.dispatch(startSetMatchScore(this.props.match));
	};
	closeModal = () => {
		this.props.dispatch(startSetMatchScore({}));
	};
	handleClick = () => {
		const score = {
			user: this.props.user.userId,
			fecha: this.props.fecha,
			time: this.props.match.time,
			matchId: this.props.matchId,
			group: this.props.match.group,
			teamA: this.props.match.teamA,
			teamB: this.props.match.teamB,
			error: this.props.match.error,
			scoreA: (this.scores && this.scores.scoreA) || 0,
			scoreB: (this.scores && this.scores.scoreB) || 0,
			flagA: this.props.flag[0],
			flagB: this.props.flag[1]
		};
		if (this.state.matchEnabled) {
			this.props.dispatch(setScore(score));
		}
	};
	componentDidMount() {
		const serverTime = moment('' + this.props.serverTime, 'YYYY-MM-DD HH:mm');
		const matchTime = moment(this.props.fecha + ' ' + this.props.match.time, 'YYYY-MM-DD HH:mm');

		if (serverTime.isSameOrBefore(matchTime)) {
			this.setState(() => ({ matchEnabled: true }));
		} else {
			this.setState(() => ({ matchEnabled: false }));
		}
	}
	render() {
		this.scores = this.props.match.scores ? this.props.match.scores[this.user] : undefined;
		return (
			<React.Fragment>
				{this.props.fecha === this.props.scoreToUpdate.fecha &&
					this.props.matchId === this.props.scoreToUpdate.matchId &&
					(this.props.scoreToUpdate.error && alert('' + this.props.scoreToUpdate.error))}
				<div className={this.state.matchEnabled ? 'match' : 'match match_started'} onClick={this.handleClick}>
					<div className="match_team">
						<div className="match_country">
							<img src={this.props.flag[0]} alt="" />
							<p>{this.props.match.teamA}</p>
						</div>
						<span className="match_score">{this.scores && this.scores.scoreA}</span>
					</div>
					<div className="match_center">
						<p>
							{this.props.match.group.length > 1 ? false : 'GRUPO'} {this.props.match.group}
						</p>
						<p className="vs">vs</p>
						<p className="time">{this.props.match.time}</p>
					</div>
					<div className="match_team">
						<span className="match_score match_score_right">{this.scores && this.scores.scoreB}</span>
						<div className="match_country">
							<img src={this.props.flag[1]} alt="" />
							<p>{this.props.match.teamB}</p>
						</div>
					</div>
					{this.scores &&
					!this.props.match.finished && (
						<div className="ribbon">
							<span>sent</span>
						</div>
					)}
					{this.props.match.finished && (
						<div className="ribbon ribbon_pink">
							<span>finished</span>
						</div>
					)}
					{!this.state.matchEnabled ? (
						<div className="match_others">
							<button className="button_nav" onClick={this.loadMatchScores}>
								See submited scores
							</button>
						</div>
					) : (
						false
					)}
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		user: state.user,
		score: state.score,
		scoreToUpdate: state.scoreToUpdate
	};
};

export default connect(mapStateToProps)(Match);
