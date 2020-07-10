import React, { useEffect } from 'react'
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

const mapStateToProps = ({ authenticatedUser }) => ({ authenticatedUser })

export default connect(mapStateToProps)(withRouter(({ dispatch, authenticatedUser, location }) => {
	useEffect(() => {
		// Get the initial data
		dispatch(handleInitialData())
	})

	if (!authenticatedUser) {
		// Redirect to login page if the user hasn't logged in
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
			<Route exact path='/login' component={Login} />
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

				{/* <Route exact path='/login' component={Login} /> */}

				{/* If no match, render the 404 page */}
				<Route component={NotFound} />
		</Switch>

			<AppBar />
		</>
	)
}))
