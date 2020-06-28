import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
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
		return (
			<BrowserRouter>
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

function mapStateToProps( state ) {
	return {
		state
	}
}