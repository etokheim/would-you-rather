import React from 'react'
import PropTypes from 'prop-types'

function LoginUserCard(props) {
	const { user } = props
	return (
		<div>
			{ user.name }
			{ console.log(user) }
		</div>
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
	}).isRequired
}

export default LoginUserCard
