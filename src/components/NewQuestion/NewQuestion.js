import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppBar from '../AppBar/AppBar'
import { connect } from 'react-redux'
import { handleAskQuestion } from '../../actions/questions'

const mapStateToProps = ({ users, authenticatedUser }) => { return { users, authenticatedUser } }

export default connect(mapStateToProps)(class NewQuestion extends Component {
	static propTypes = {
		users: PropTypes.object.isRequired
	}

	state = {
		optionOneText: "",
		optionTwoText: ""
	}

	handleInput = (event, stateProperty) => {
		const value = event.target.value

		this.setState({
			[stateProperty]: value
		})
	}

	handleSubmitQuestion = (event) => {
		const { optionOneText, optionTwoText } = this.state
		const { users, authenticatedUser } = this.props
		const user = users[authenticatedUser]

		this.props.dispatch(handleAskQuestion(optionOneText, optionTwoText, user.id))
		
		// Clear the text areas
		this.setState({
			optionOneText: "",
			optionTwoText: ""
		})
	}

	render() {
		const { optionOneText, optionTwoText } = this.state
		return (
			<div>
				<h1>New Question</h1>
				<h3>Would you rather</h3>
				<textarea onChange={ (event) => this.handleInput(event, "optionOneText") } value={ optionOneText} /><br />
				<p>or</p>
				<textarea onChange={ (event) => this.handleInput(event, "optionTwoText") } value={ optionTwoText} /><br />
				<button type="submit" onClick={ this.handleSubmitQuestion }>Ask question</button>
				<AppBar />
			</div>
		)
	}
})
