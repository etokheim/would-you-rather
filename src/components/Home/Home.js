import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AppBar from '../AppBar/AppBar'
import toArray from '../../helpers/toArray'
import Question from '../Question/Question'

function mapStateToProps({ questions, authenticatedUser, users }) {
	return {
		questions, authenticatedUser, users
	}
}

export default connect(mapStateToProps)(class Home extends Component {
	static propTypes = {
		questions: PropTypes.object.isRequired,
		authenticatedUser: PropTypes.string.isRequired,
		users: PropTypes.object.isRequired
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
		const { filter, user } = this.state
		const questions = toArray(this.props.questions)

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
								// sort by most recent questions first
								.sort((a, b) => b.timestamp - a.timestamp)
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