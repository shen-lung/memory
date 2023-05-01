import React, { useState, useContext } from 'react'
import { Button, Image } from 'react-bootstrap'
import { AppContext } from '../context/AppContext'
import GameSection from './GameSection'
import SetupModal from '../components/SetupModal'
import ResultModal from '../components/ResultModal'
import Header from '../containers/Header'
import { mainIcons } from '../assets/SectionIcons'

import './Game.scss'

// Game section where we show the game's process
const Game = () => {
	const {
		isGameProcess,
		isGameFinished,
		setIsGameFinishedContext,
		setIsGameProcessContext,
		setSuccessContext,
		setErrorsContext,
	} = useContext(AppContext)

	const [showModal, setShowModal] = useState(false)

	const handleGameSetup = () => setShowModal(!showModal)
	const handleGame = () => {
		setIsGameFinishedContext(!isGameFinished)
		setShowModal(true)
		setIsGameProcessContext(false)
		setSuccessContext(0)
		setErrorsContext(0)
	}

	return (
		<div className="game-section">
			{!isGameProcess && (
				<div className="game-section__intro">
					<div className="col col-sm-10 col-md-7 d-grid mx-auto">
						<Image
							className="game-section__image-intro"
							src={mainIcons.iconIntro}
						/>
					</div>
					<div className="d-flex justify-content-center col-2 mx-auto mt-5">
						<Button
							variant="primary"
							onClick={handleGameSetup}
							className="text-uppercase"
						>
							Play
						</Button>
					</div>
				</div>
			)}
			<SetupModal show={showModal} setShowModal={handleGameSetup} />
			<ResultModal show={isGameFinished} setShowModal={handleGame} />
			{isGameProcess && <Header />}
			{isGameProcess && <GameSection />}
		</div>
	)
}

export default Game
