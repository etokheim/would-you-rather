import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default class Home extends Component {
	static propTypes = {
		// prop: PropTypes
	}

	render() {
		return (
			<div>
				This is Home
				<Link to='/login'>Login</Link>
			</div>
		)
	}
}
