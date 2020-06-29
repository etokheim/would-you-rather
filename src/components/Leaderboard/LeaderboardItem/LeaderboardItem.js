import React from 'react'
import PropTypes from 'prop-types'
import toArray from '../../../helpers/toArray'

function LeaderboardItem(props) {
	const { user } = props
	const answers = toArray(user.answers)

	return (
		<div className='leaderboardItem'>
			<img src={user.avatarURL} className='profile' alt='profile' />
			<h3>{ user.name }</h3>
			<div className='answered'>
				<div className='title'>
					Answered
				</div>
				<div className='counter'>
					{ answers.length }
				</div>
			</div>
			<div className='asked'>
				<div className='title'>
					Asked
				</div>
				<div className='counter'>
					{ user.questions.length }
				</div>
			</div>
			<div className='score'>
				<div className='title'>
					Score
				</div>
				<div className='counter'>
					{ user.questions.length * 100 + answers.length * 300 }
				</div>
			</div>
		</div>
	)
}

LeaderboardItem.propTypes = {
	user: PropTypes.object.isRequired
}

export default LeaderboardItem
