import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function LoginUserCard(props) {
	const { user, handleSetAuthenticatedUser } = props
	return (
		<Link to='/' onClick={() => handleSetAuthenticatedUser(user)}>
			<div>
				<img src={user.avatarURL} alt='Profile' />
				{ user.name }
			</div>
		</Link>
	)
}

LoginUserCard.propTypes = {
	user: PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		answers: PropTypes.shape({
			id: PropTypes.string
		}).isRequired,
		avatarURL: PropTypes.string,
		questions: PropTypes.array
	}).isRequired,
	handleSetAuthenticatedUser: PropTypes.func.isRequired
}

export default LoginUserCard
