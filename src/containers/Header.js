import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

import './Header.scss'

// Header section where we show the user's score.
const Header = () => {
	const { success, errors } = useContext(AppContext)

	return (
		<div className="col-12 header">
			<div className="fs-1">
				<div className="d-flex justify-content-center align-items-center header-game">
					<span className="fs-5">
						Success:{' '}
						<span className="fw-bold header-game__success">{success}</span> /
						Errors: <span className="fw-bold header-game__error">{errors}</span>
					</span>
				</div>
			</div>
		</div>
	)
}

export default Header
