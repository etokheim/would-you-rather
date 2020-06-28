import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AppBar from '../AppBar/AppBar'

export default class Home extends Component {
	static propTypes = {
		// prop: PropTypes
	}

	render() {
		return (
			<div>
				<h1>Home</h1>
				<AppBar />
			</div>
		)
	}
}
