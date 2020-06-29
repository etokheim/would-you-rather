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

	render() {
		const { users } = this.props

		return (
			<div>
				<h1>Leaderboard</h1>
				<div className="leaderboard">
					{ toArray(users).map((user) => (
						<LeaderboardItem user={ user } key={ user.id } />
					)) }
				</div>
				<AppBar />
			</div>
		)
	}
})
