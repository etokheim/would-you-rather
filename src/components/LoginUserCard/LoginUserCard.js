import React from 'react'
import PropTypes from 'prop-types'

function LoginUserCard(props) {
	const { user, handleSetAuthenticatedUser } = props
	return (
		<button onClick={() => handleSetAuthenticatedUser(user)} type='button' style={{ border: 'none', display: 'block' }}>
			<img src={user.avatarURL} alt='Profile' />
			{ user.name }
		</button>
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
