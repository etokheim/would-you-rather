import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { setAuthenticatedUser } from '../../actions/authenticatedUser'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './appBar.scss'
import MenuItem from '../MenuItem/MenuItem'

function mapStateToProps({ authenticatedUser, users }) {
	return {
		authenticatedUser,
		users
	}
}

export default connect(mapStateToProps)(class AppBar extends Component {
	static propTypes = {
		authenticatedUser: PropTypes.string.isRequired,
		users: PropTypes.object.isRequired
	}

	state = {
		user: this.props.users[this.props.authenticatedUser]
	}

	handleLogOut = () => {
		this.props.dispatch(setAuthenticatedUser(null))
	}

	render() {
		const { user } = this.state
		return (
			<div className="appBar">
				<div className="user">
					<h3 className="name">{ user.name }</h3>
					<div>
						<Link to="#" onClick={this.handleLogOut}>
							Log out
						</Link>
					</div> 
				</div>

				<div className="menu">
					<MenuItem url="/" title="Home" />
					<MenuItem url="/leaderboard" title="Leaderboard" />
					<MenuItem url="/add" title="Ask Question" />
				</div>
			</div>
		)
	}
})
