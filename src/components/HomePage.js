import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { setMatches, startSetMatches } from '../actions/matchesActions';
import Fecha from './Fecha';
import SendScoreModal from './SendScoreModal';
import { setScore } from '../actions/scoreActions';
import database from '../helpers/database';
import moment from 'moment';
import MatchScores from './MatchScores';
import { startSetMatchScore } from '../actions/matchScoreActions';
import { startSetPhase } from '../actions/phaseActions';
class HomePage extends React.Component {
	loading = true;

	constructor(props) {
		super(props);
		this.state = {
			serverTime: undefined,
			groups_hidden: false,
			color: '#FF5252'
		};
	}

	toggleGroups = () => {
		this.setState(() => ({ groups_hidden: !this.state.groups_hidden }));
	};

	componentDidMount() {
		this.props.dispatch(startSetMatches());
		// this.props.dispatch(startSetPhase());

		fetch('http://www.elbauto.com:8090/time')
			.then((response) => response.json()) //this is the promise
			.then((responseJSON) => {
				console.log(responseJSON);
				//actual result
				let serverDate = responseJSON['datetime'];
				console.log(serverDate);
				this.setState(() => ({
					serverTime: moment(serverDate, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm')
				}));
			});
	}

	resetScore = () => {
		console.log('closing');
		this.props.dispatch(setScore({ teamA: '', teamB: '', group: '', scoreA: 0, scoreB: 0 }));
	};

	closeModal = () => {
		this.props.dispatch(startSetMatchScore({}));
	};
	toggleColor = (color) => {
		const items_bg = [ '.header', '.slider', '.pink_button' ];
		const items_fg = [
			'.fecha_title',
			'.match_score',
			'.vs',
			'.score',
			'.match_bottom_text_pink',
			'.score_number'
		];
		items_bg.map((item) => {
			let elems = document.querySelectorAll(item);
			let index = 0,
				length = elems.length;
			for (; index < length; index++) {
				elems[index].style.transition = 'opacity 0.5s linear 0s';
				elems[index].style.background = color;
			}
		});
		items_fg.map((item) => {
			let elems = document.querySelectorAll(item);
			let index = 0,
				length = elems.length;
			for (; index < length; index++) {
				elems[index].style.transition = 'opacity 0.5s linear 0s';
				elems[index].style.color = color;
			}
		});
	};
	render() {
		const matchDates = Object.keys(this.props.fechas);
		return (
			<React.Fragment>
				<Header history={this.props.history} />
				<div className="home_page">
					<div className="group_phase">
						{
							// <span>Ocultar fase de grupos</span>
							// <label className="switch">
							// 	<input onChange={this.toggleGroups} type="checkbox" checked={this.state.groups_hidden} />
							// 	<span className="slider" />
							// </label>
						}
					</div>

					{matchDates.length === 0 ? (
						<p> loading... </p>
					) : (
						matchDates.map((fecha) => {
							if (
								this.state.groups_hidden &&
								(!this.props.fechas[fecha].phase || this.props.fechas[fecha].phase === 'one')
							) {
								return false;
							} else {
								return (
									<Fecha
										matches={this.props.fechas[fecha].matches}
										fecha={fecha}
										key={fecha}
										serverTime={this.state.serverTime}
									/>
								);
							}
						})
					)}
					{
						<div className="modals">
							<MatchScores closeModal={this.closeModal} />
							<SendScoreModal resetScore={this.resetScore} />
						</div>
						// <SendScoreModal  score = {{teamA:"uruguay",teamB:"egipto",group:"",scoreA:0,scoreB:0}} resetScore={this.resetScore}/>
					}
				</div>
			</React.Fragment>
		);
	}
}
const mapStateToProps = (state, props) => {
	return {
		fechas: state.fechas,
		score: state.scoreToUpdate,
		user: state.user,
		phase: state.phase
	};
};

export default connect(mapStateToProps)(HomePage);
