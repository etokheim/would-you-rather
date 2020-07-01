import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AppBar from '../AppBar/AppBar'
import toArray from '../../helpers/toArray'
import LeaderboardItem from './LeaderboardItem/LeaderboardItem'

const mapStateToProps = ({ users }) => { return { users } }

export default connect(mapStateToProps)(class Leaderboard extends Component {
	static propTypes = {
		users: PropTypes.object
	}

	calculateScore = (answered, asked) => {
		// Let's make asking questions worth three times as much as answering
		return answered * 100 + asked * 300
	}

	render() {
		const { users } = this.props
		const sortedUsers = toArray(users).sort((a, b) => this.calculateScore(toArray(a.answers).length, a.questions.length) - this.calculateScore(toArray(b.answers).length, b.questions.length)).reverse()

		return (
			<div>
				<h1>Leaderboard</h1>
				<div className="leaderboard">
					{ sortedUsers.map((user) => (
						<LeaderboardItem user={ user } key={ user.id } />
					)) }
				</div>
				<AppBar />
			</div>
		)
	}
})
