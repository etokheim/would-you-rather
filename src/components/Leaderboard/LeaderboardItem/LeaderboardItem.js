import React from 'react'
import PropTypes from 'prop-types'
import toArray from '../../../helpers/toArray'
import './leaderboardItem.scss'

function LeaderboardItem(props) {
	const { user, calculateScore } = props
	const answers = toArray(user.answers)

	return (
		<div className='leaderboardItem'>
			<img src={user.avatarURL} className='profile' alt='profile' />
			<div className='nameAndStatistics'>
				<h3 className='name'>{ user.name }</h3>
				<div className='statisticsContainer'>
					<div className='answered'>
						<div className='counter'>
							<span role='img' aria-label='answered questions'>💬 </span>
							{ answers.length }
						</div>
					</div>
					<div className='asked'>
						<div className='counter'>
							<span role='img' aria-label='Asked questions'>❔ </span>
							{ user.questions.length }
						</div>
					</div>
				</div>
			</div>
			<div className='score'>
				<div className='title'>
					Score
				</div>
				<div className='counter'>
					{ calculateScore(answers.length, user.questions.length) }
				</div>
			</div>
		</div>
	)
}

LeaderboardItem.propTypes = {
	user: PropTypes.object.isRequired,
	calculateScore: PropTypes.func.isRequired
}

export default LeaderboardItem
