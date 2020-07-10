import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import LoginUserCard from '../LoginUserCard/LoginUserCard'
import toArray from '../../helpers/toArray'
import { setAuthenticatedUser } from '../../actions/authenticatedUser'

function mapStateToProps({ users }) {
	return {
		users
	}
}

export default connect(mapStateToProps)(({ users, location, dispatch }) => {
	// State
	const [redirect, setRedirect] = useState(false)
	const [user, setUser] = useState({})

	const handleSetAuthenticatedUser = (user) => {
		setUser(user)
		setRedirect(true)
	}

	// If redirect is set, redirect to it
	if (redirect) {
		dispatch(setAuthenticatedUser(user.id))

		return (
			<Redirect to={location.state.redirectedFrom} />
		)
	}

	return (
		<div>
			<h1>Login</h1>
			<h3>Select user</h3>
			{
				toArray(users).map((user) => (
					<LoginUserCard user={user} key={user.id} handleSetAuthenticatedUser={handleSetAuthenticatedUser} />
				))
			}
		</div>
	)
})
