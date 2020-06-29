import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppBar from '../AppBar/AppBar'
import { connect } from 'react-redux'

function mapStateToProps(props) {
	return {
		...props
	}
}

export default connect(mapStateToProps)(class WouldYouRather extends Component {
	static propTypes = {
		prop: PropTypes
	}

	handleChoose = (option) => {
		console.log(`Chose option ${option}`);
	}

	render() {
		const { match: { params }, questions, users } = this.props;
		const question = questions[params.questionId]
		const user = users[question.author]

		return (
			<div>
				Would you rather
				<div className="wouldYouRather">
					<div className="option" onClick={ () => this.handleChoose(0)}>
						{ question.optionOne.text }
					</div>
					<div className="option" onClick={ () => this.handleChoose(1)}>
						{ question.optionTwo.text }
					</div>
					<div className="author">
						<div className="picture">
							<img src={ user.avatarURL } />
						</div>
						<div className="name">
							{ user.name }
						</div>
					</div>
				</div>
				
				<AppBar />
			</div>
		)
	}
})
