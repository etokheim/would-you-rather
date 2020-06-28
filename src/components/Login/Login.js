import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import LoginUserCard from '../LoginUserCard/LoginUserCard'
import toArray from '../../helpers/toArray'

function mapStateToProps({ users }) {
	return {
		users
	}
}

export default connect(mapStateToProps)(class Login extends Component {
	static propTypes = {
		users: PropTypes.object
	}

	render() {
		const { users } = this.props
		return (
			<div>
				Login page
				<Link to='/'>Home</Link>
				{
					toArray(users).map((user) => (
						<LoginUserCard user={ user } key={ user.id } />
					))
				}
			</div>
		)
	}
})
