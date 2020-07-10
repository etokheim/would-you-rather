import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
	Switch, Route, Redirect, withRouter
} from 'react-router-dom'
import PropTypes from 'prop-types'
import './App.scss'
import Login from '../Login/Login'
import Home from '../Home/Home'
import WouldYouRather from '../WouldYouRather/WouldYouRather'
import NewQuestion from '../NewQuestion/NewQuestion'
import Leaderboard from '../Leaderboard/Leaderboard'
import handleInitialData from '../../actions/shared'
import NotFound from '../404/NotFound'
import AppBar from '../AppBar/AppBar'
import { setAuthenticatedUser } from '../../actions/authenticatedUser'

const mapStateToProps = ({ authenticatedUser }) => ({ authenticatedUser })

export default connect(mapStateToProps)(withRouter(({ dispatch, authenticatedUser, location }) => {
	// State
	const [redirect, setRedirect] = useState(false)

	useEffect(() => {
		// Get the initial data
		dispatch(handleInitialData())
	})

	const handleSetAuthenticatedUser = (user) => {
		dispatch(setAuthenticatedUser(user.id))
		setRedirect(true)
	}

	// Redirect if redirect has been set and a user is logged in
	if (redirect && authenticatedUser) {
		// Stop redirecting after the user has been redirected
		// If we stop redirecting immediately, the view don't have time to render, and
		// will therefor never redirect.
		if (location.pathname !== '/login') {
			setRedirect(false)
		}

		let redirectionUrl = '/'
		if (location.state && location.state.redirectedFrom !== '/login') {
			redirectionUrl = location.state.redirectedFrom
		}

		return (
			<Redirect to={redirectionUrl} />
		)
	}

	// Redirect to login page if the user hasn't logged in
	// Also append where we are redirecting from to the redirect state. This way we can redirect
	// back after the user has logged in.
	if (!authenticatedUser) {
		if (location.pathname !== '/login') {
			return (
				<Redirect
					to={{
						pathname: '/login',
						state: {
							redirectedFrom: location.pathname
						}
					}}
				/>
			)
		}

		// Display the login page if no user is logged in
		return (
			<Route
				exact
				path='/login'
				render={() => (
					<Login location={location} handleSetAuthenticatedUser={handleSetAuthenticatedUser} />
				)}
			/>
		)
	}

	// Else, the user has logged in and we can display components that need user data
	return (
		<>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/questions/:questionId' component={WouldYouRather} />
				<Route exact path='/add' component={NewQuestion} />
				<Route exact path='/leaderboard' component={Leaderboard} />

				{/* If no match, render the 404 page */}
				<Route component={NotFound} />
			</Switch>

			<AppBar />
		</>
	)
}))
