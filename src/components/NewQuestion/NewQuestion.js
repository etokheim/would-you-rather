import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppBar from '../AppBar/AppBar'
import { connect } from 'react-redux'

const mapStateToProps = ({ }) => { return { } }

export default connect(mapStateToProps)(class NewQuestion extends Component {
	static propTypes = {
		prop: PropTypes
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

	handleAskQuestion = (event) => {
		event.preventDefault()
		console.log("Clicked button");

		// this.props.dispatch()
	}

	render() {
		return (
			<div>
				<h1>New Question</h1>
				<textarea onChange={ (event) => this.handleInput(event, "optionOneText") } />
				<textarea onChange={ (event) => this.handleInput(event, "optionTwoText") } />
				<button type="submit" onClick={ this.handleAskQuestion }>Ask question</button>
				<AppBar />
			</div>
		)
	}
})
