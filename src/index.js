import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import App from './components/App/App'
import * as serviceWorker from './serviceWorker'
import reducer from './reducers'
import middleware from './middleware'

const store = createStore(reducer, middleware)
const history = createBrowserHistory()

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter history={history}>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
