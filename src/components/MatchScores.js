import React from 'react';
import { connect } from 'react-redux';
import AriaModal from 'react-aria-modal';
import MatchScoreItem from './MatchScoreItem';
import { startSetMatchScore } from '../actions/matchScoreActions';

class MatchScores extends React.Component {
	afterModalOpen = () => {};

	onModalClose = () => {};

	componentDidMount = () => {};

	getApplicationNode = () => {
		return document.getElementById('app');
	};

	render() {
		const matchInfo = {
			teamA: this.props.matchScore.teamA,
			teamB: this.props.matchScore.teamB
		};

		return (
			<React.Fragment>
				{this.props.matchScore.teamA ? (
					<AriaModal
						onExit={this.props.closeModal}
						getApplicationNode={this.getApplicationNode}
						titleText="Pronosticos"
						underlayClickExits={false}
						underlayClass={'match_scores'}
						includeDefaultStyles={false}
					>
						<div className="ms_layout">
							<h2 className="ms_title">Scores sent</h2>
							<h2 className="ms_subtitle">
								{this.props.matchScore.teamA} vs {this.props.matchScore.teamB}
							</h2>

							<div className="ms_all_scores">
								{this.props.matchScore.scores &&
									Object.keys(this.props.matchScore.scores).map((score) => {
										return (
											<MatchScoreItem
												key={score}
												matchInfo={matchInfo}
												matchScore={this.props.matchScore.scores[score]}
											/>
										);
									})}
							</div>
							<button className="ms_close" onClick={this.props.closeModal}>
								cerrar
							</button>
						</div>
					</AriaModal>
				) : (
					false
				)}
			</React.Fragment>
		);
	}
}
const mapStateToProps = (state, props) => {
	return {
		matchScore: state.matchScore
	};
};
export default connect(mapStateToProps)(MatchScores);
