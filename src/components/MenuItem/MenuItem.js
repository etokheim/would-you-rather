import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function MenuItem(props) {
	const { url, title } = props
	return (
		<Link to={url}>
			<div className='item'>
				<div className='icon' />
				<div className='title'>
					{ title }
				</div>
			</div>
		</Link>
	)
}

MenuItem.propTypes = {
	url: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired
}

export default MenuItem
