import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppBar from '../AppBar/AppBar'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../../actions/questions'
import authenticatedUser from '../../reducers/authenticatedUser'

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

		console.log(`Chose option ${option}`)
		dispatch(handleAnswerQuestion(question, authenticatedUser, option))
	}

	render() {
		const { match: { params }, questions, users, authenticatedUser } = this.props;
		const question = questions[params.questionId]
		const author = users[question.author]

		// If optionOne contains user, she answered question 0
		// else if optionTwo contains user, she answered question 1
		const answeredQuestion = question.optionOne.votes.find((vote) => vote === authenticatedUser)
								? 0
								: question.optionTwo.votes.find((vote) => vote === authenticatedUser)
									? 1
									: undefined

		return (
			<div>
				Would you rather
				<div className="wouldYouRather">
					<div className="option" onClick={ () => this.handleChoose(0)}>
						<span style={{ color: answeredQuestion === 0 ? "green" : "" }}>
							{ question.optionOne.text }
						</span>
					</div>
					<div className="option" onClick={ () => this.handleChoose(1)}>
						<span style={{ color: answeredQuestion === 1 ? "green" : "" }}>
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
