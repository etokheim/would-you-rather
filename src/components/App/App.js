import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import './App.css'
import Login from '../Login/Login'
import Home from '../Home/Home'
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
