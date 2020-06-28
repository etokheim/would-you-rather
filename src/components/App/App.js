import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import './App.css'
import Login from '../Login/Login'
import Home from '../Home/Home'
import handleInitialData from './../../actions/shared'


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
					// Redirect to login page if the user hasn't logged in
					!authenticatedUser ? <Redirect to="/login" /> : ""
				}
				<Switch>
					<Route exact path='/'>
						<Home />
					</Route>
					<Route path='/login'>
						<Login />
					</Route>
				</Switch>
			</BrowserRouter>
		)
	}
})

function mapStateToProps({ authenticatedUser }) {
	return {
		authenticatedUser
	}
}