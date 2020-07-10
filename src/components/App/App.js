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

const mapStateToProps = ({ authenticatedUser }) => ({ authenticatedUser })

export default connect(mapStateToProps)(withRouter(({ dispatch, authenticatedUser, location }) => {
	useEffect(() => {
		// Get the initial data
		dispatch(handleInitialData())
	})

	return (
		<>
			{
				// Redirect to login page if the user hasn't logged in, else we can render stuff
				// that need user data.
				!authenticatedUser && location.pathname !== '/login' ? (
					<Redirect to={{
						pathname: '/login',
						state: {
							redirectedFrom: location.pathname
						}
					}}
					/>
				) : (
					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path='/questions/:questionId' component={WouldYouRather} />
						<Route exact path='/add' component={NewQuestion} />
						<Route exact path='/leaderboard' component={Leaderboard} />
					</Switch>
				)
			}

			<Route exact path='/login' component={Login} />
			<Route exact path='/404' component={NotFound} />
		</>
	)
}))
