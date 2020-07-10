import React from 'react'
import { connect } from 'react-redux'
import LoginUserCard from '../LoginUserCard/LoginUserCard'
import toArray from '../../helpers/toArray'

const mapStateToProps = ({ users }) => ({ users })

export default connect(mapStateToProps)(({
	users, location, dispatch, handleSetAuthenticatedUser
}) => (
	<div>
		<h1>Login</h1>
		<h3>Select user</h3>
		{
			toArray(users).map((user) => (
				<LoginUserCard user={user} key={user.id} handleSetAuthenticatedUser={handleSetAuthenticatedUser} />
			))
		}
	</div>
))
