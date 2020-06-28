import React from 'react'
import PropTypes from 'prop-types'
import './question.scss'

function Question(props) {
	const { question } = props

	const {
		author, optionOne
	} = question

	return (
		<div className='question'>
			<div className='title'>
				{/* TODO: Display the name instead of username */}
				{ `${author} asks:` }
			</div>
			<div className='body'>
				{ optionOne.text }
			</div>
		</div>
	)
}

Question.propTypes = {
	question: PropTypes.shape({
		author: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
		optionOne: PropTypes.shape({
			votes: PropTypes.array,
			text: PropTypes.string.isRequired
		}).isRequired,
		optionTwo: PropTypes.shape({
			votes: PropTypes.array,
			text: PropTypes.string
		}).isRequired,
		timestamp: PropTypes.number
	}).isRequired
}

export default Question
