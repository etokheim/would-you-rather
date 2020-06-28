import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default class Login extends Component {
	static propTypes = {
		// prop: PropTypes
	}

	render() {
		return (
			<div>
				Login page
				<Link to='/'>Home</Link>
			</div>
		)
	}
}
