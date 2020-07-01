import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppBar from '../AppBar/AppBar'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../../actions/questions'
import './wouldYouRather.scss'

function mapStateToProps(props) {
	return {
		...props
	}
}

export default connect(mapStateToProps)(class WouldYouRather extends Component {
	static propTypes = {
		prop: PropTypes
	}

	state = {
		answeredQuestion: undefined
	}

	handleChoose = (option) => {
		const { match: { params }, questions, authenticatedUser, dispatch } = this.props;
		const question = questions[params.questionId]

		this.setState({
			answeredQuestion: option
		})

		dispatch(handleAnswerQuestion(question, authenticatedUser, option))
	}

	componentDidMount() {
		const { match: { params }, questions, authenticatedUser } = this.props;
		const question = questions[params.questionId]

		// If optionOne contains user, she answered optionOne
		// else if optionTwo contains user, she answered optionTwo
		const answeredQuestion = question.optionOne.votes.find((vote) => vote === authenticatedUser)
			? "optionOne"
			: question.optionTwo.votes.find((vote) => vote === authenticatedUser)
				? "optionTwo"
				: undefined

		this.setState({
			answeredQuestion
		})
	}

	render() {
		const { match: { params }, questions, users } = this.props;
		const question = questions[params.questionId]
		const author = users[question.author]
		const { answeredQuestion } = this.state
		const optionOneVotes = question.optionOne.votes.length
		const optionTwoVotes = question.optionTwo.votes.length
		const totalVotes = optionOneVotes + optionTwoVotes

		return (
			<div>
				<h1>Would you rather</h1>
				<div className="wouldYouRather">
					<div className="option" onClick={ () => this.handleChoose("optionOne")}>
						<div style={{ color: answeredQuestion === "optionOne" ? "green" : "" }}>
							{ question.optionOne.text }
						</div>
						{ answeredQuestion ? (
							<div className="statistics">
								{ `${ Math.round((100 / totalVotes) * optionOneVotes) }% voted for this answer (${ optionOneVotes }/${ totalVotes })` }
							</div>
						) : "" }
					</div>
					<div className="option" onClick={ () => this.handleChoose("optionTwo")}>
						<div style={{ color: answeredQuestion === "optionTwo" ? "green" : "" }}>
							{ question.optionTwo.text }
						</div>
						{ answeredQuestion ? (
							<div className="statistics">
								{ `${ Math.round((100 / totalVotes) * optionTwoVotes) }% voted for this answer (${ optionTwoVotes }/${ totalVotes })` }
							</div>
						) : "" }
					</div>
					<div className="author">
						<div className="picture">
							<img src={ author.avatarURL } />
						</div>
						<div className="name">
							{ author.name }
						</div>
					</div>
				</div>
				
				<AppBar />
			</div>
		)
	}
})
