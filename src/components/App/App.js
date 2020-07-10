import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
	BrowserRouter, Switch, Route, Redirect
} from 'react-router-dom'
import { createBrowserHistory } from 'history'
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

const history = createBrowserHistory()

export default connect(mapStateToProps)(({ dispatch, authenticatedUser }) => {
	useEffect(() => {
		// Get the initial data
		dispatch(handleInitialData())
	})

	return (
		<BrowserRouter history={history}>
			History is:
			{' '}
			{ JSON.stringify(history) }
			{
				// Redirect to login page if the user hasn't logged in, else we can render stuff
				// that need user data.
				!authenticatedUser ? (
					<Redirect to={{
						pathname: '/login',
						state: {
							thingOne: 'its me',
							intended: '/lalala',
							redirectFrom: 'state.currentRoute'
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
		</BrowserRouter>
	)
})
