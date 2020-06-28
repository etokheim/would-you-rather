import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
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
		questions: PropTypes.shape({
			author: PropTypes.string
		})
	}

	state = {
		filter: "new",
		user: this.props.users[this.props.authenticatedUser],
		newQuestions: [], // Questions the user hasn't answered
		answeredQuestions: [] // Questions the user already answered
	}

	// Separates which questions are answered and not in the state's newQuestions and answeredQuestions properties
	filterQuestions = () => {
		const { questions } = this.props
		const { user } = this.state

		// Questions are originally an object containing a lot of objects, so let's convert it to an array for easier handling (in this case)
		const questionsArray = toArray(questions)

		const answeredQuestions = []
		const newQuestions = []

		// Filter the questions array
		questionsArray.map((question) => {
			// Concatenate all votes to one array
			const allVotes = question.optionOne.votes.concat(question.optionTwo.votes)

			// Then check if the logged in user is among the votes
			const voted = allVotes.find((vote) => {
				if(vote === user.id) {
					return true
				} else {
					return false
				}
			})

			// If the logged in user was found among the votes, the question is already answered
			if(voted) {
				answeredQuestions.push(question)
			} else {
				newQuestions.push(question)
			}
		})

		this.setState({
			answeredQuestions,
			newQuestions
		})
	}

	handleChangeFilter = (filter) => {
		this.setState({
			filter
		})
	}

	componentDidMount() {
		this.filterQuestions();
	}

	render() {
		const { answeredQuestions, newQuestions, filter } = this.state

		// Display the questions corresponding to the filter state
		const questions = filter === "new" ? newQuestions : answeredQuestions

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
						{/* Render questions */}
						{ questions.map((question) => (
							<Question question={ question } key={ question.id } />
						)) }
					</div>
				</div>
				<AppBar />
			</div>
		)
	}
}
)