import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import './App.css'
import Login from '../Login/Login'
import Home from '../Home/Home'
import WouldYouRather from '../WouldYouRather/WouldYouRather'
import NewQuestion from '../NewQuestion/NewQuestion'
import Leaderboard from '../Leaderboard/Leaderboard'
import handleInitialData from './../../actions/shared'

function mapStateToProps({ authenticatedUser }) {
	return {
		authenticatedUser
	}
}

export default connect(mapStateToProps)(class App extends Component {
	static propTypes = {
		// prop: PropTypes
	}

	componentDidMount() {
		// Get the initial data
		this.props.dispatch(handleInitialData())
	}

	render() {
		const { authenticatedUser } = this.props
		return (
			<BrowserRouter>
				{
					// Redirect to login page if the user hasn't logged in, else we can render stuff
					// that need user data.
					!authenticatedUser ? <Redirect to="/login" /> : (
						<Switch>
							<Route exact path='/'>
								<Home />
							</Route>
							<Route exact path='/questions/:question_id'>
								<WouldYouRather />
							</Route>
							<Route exact path='/add'>
								<NewQuestion />
							</Route>
							<Route exact path='/leaderboard'>
								<Leaderboard />
							</Route>
						</Switch>
					)
				}

				<Route path='/login'>
					<Login />
				</Route>
			</BrowserRouter>
		)
	}
})
