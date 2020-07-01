import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppBar from '../AppBar/AppBar'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../../actions/questions'

function mapStateToProps(props) {
	return {
		...props
	}
}

export default connect(mapStateToProps)(class WouldYouRather extends Component {
	static propTypes = {
		prop: PropTypes
	}

	handleChoose = (option) => {
		const { match: { params }, questions, authenticatedUser, dispatch } = this.props;
		const question = questions[params.questionId]

		dispatch(handleAnswerQuestion(question, authenticatedUser, option))
	}

	render() {
		const { match: { params }, questions, users, authenticatedUser } = this.props;
		const question = questions[params.questionId]
		const author = users[question.author]

		// If optionOne contains user, she answered optionOne
		// else if optionTwo contains user, she answered optionTwo
		const answeredQuestion = question.optionOne.votes.find((vote) => vote === authenticatedUser)
								? "optionOne"
								: question.optionTwo.votes.find((vote) => vote === authenticatedUser)
									? "optionTwo"
									: undefined

		return (
			<div>
				Would you rather
				<div className="wouldYouRather">
					<div className="option" onClick={ () => this.handleChoose("optionOne")}>
						<span style={{ color: answeredQuestion === "optionOne" ? "green" : "" }}>
							{ question.optionOne.text }
						</span>
					</div>
					<div className="option" onClick={ () => this.handleChoose("optionTwo")}>
						<span style={{ color: answeredQuestion === "optionTwo" ? "green" : "" }}>
							{ question.optionTwo.text }
						</span>
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
