import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppBar from '../AppBar/AppBar'

export default class Leaderboard extends Component {
	static propTypes = {
		prop: PropTypes
	}

	render() {
		return (
			<div>
				Leaderboard
				<AppBar />
			</div>
		)
	}
}
