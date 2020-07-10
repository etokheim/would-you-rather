import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LoginUserCard from '../LoginUserCard/LoginUserCard'
import toArray from '../../helpers/toArray'
import { setAuthenticatedUser } from '../../actions/authenticatedUser'

function mapStateToProps({ users }) {
	return {
		users
	}
}

export default connect(mapStateToProps)(({ users, location, dispatch }) => {
	const handleSetAuthenticatedUser = (user) => {
		dispatch(setAuthenticatedUser(user.id))
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
