import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppBar from '../AppBar/AppBar'

export default class NewQuestion extends Component {
	static propTypes = {
		prop: PropTypes
	}

	render() {
		return (
			<div>
				New Question
				<AppBar />
			</div>
		)
	}
}
