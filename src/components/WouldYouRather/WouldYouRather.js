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

		console.log(`Chose option ${option}`)
		dispatch(handleAnswerQuestion(question, authenticatedUser, option))
	}

	render() {
		const { match: { params }, questions, users } = this.props;
		const question = questions[params.questionId]
		const author = users[question.author]

		return (
			<div>
				Would you rather
				<div className="wouldYouRather">
					<div className="option" onClick={ () => this.handleChoose(0)}>
						{ question.optionOne.text }
					</div>
					<div className="option" onClick={ () => this.handleChoose(1)}>
						{ question.optionTwo.text }
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
