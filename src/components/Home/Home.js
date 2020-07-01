import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AppBar from '../AppBar/AppBar'
import toArray from '../../helpers/toArray'
import Question from '../Question/Question'
import user from '../../reducers/users'

function mapStateToProps({ questions, authenticatedUser, users }) {
	return {
		questions, authenticatedUser, users
	}
}

export default connect(mapStateToProps)(class Home extends Component {
	static propTypes = {
		questions: PropTypes.shape({
			author: PropTypes.string
		})
	}

	state = {
		filter: "new",
		user: this.props.users[this.props.authenticatedUser]
	}

	handleChangeFilter = (filter) => {
		this.setState({
			filter
		})
	}

	render() {
		const { answeredQuestions, newQuestions, filter, user } = this.state
		const questions = toArray(this.props.questions)

		// Display the questions corresponding to the filter state
		// const questions = filter === "new" ? newQuestions : answeredQuestions

		return (
			<div>
				<h1>Home</h1>
				<div>
					<h2>Questions</h2>
					<button onClick={ () => this.handleChangeFilter("new") }>
						<span>New</span>
					</button>
					<button onClick={ () => this.handleChangeFilter("answered") }>
						<span>Answered</span>
					</button>
					<div className="questions">
						{
							questions.filter((question) => filter === "new"
								? !question.optionOne.votes.concat(question.optionTwo.votes).includes(user.id)
								: question.optionOne.votes.concat(question.optionTwo.votes).includes(user.id)
							)
								.map((question) => (
									<Question question={ question } key={ question.id } />
								))
						}
						
					</div>
				</div>
				<AppBar />
			</div>
		)
	}
}
)