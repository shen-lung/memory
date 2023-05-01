import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Button, Form, Modal } from 'react-bootstrap'

import './SetupModal.scss'

const SetupModal = ({ show, setShowModal }) => {
	const { setCardsCountContext, setUserNameContext, setIsGameProcessContext } =
		useContext(AppContext)

	const [user, setUser] = useState('')
	const [newUser, setNewUser] = useState('')
	const [cardsCount, setCardsCount] = useState('')
	const [isActiveButton, setIsActiveButton] = useState(true)

	const userMemory = JSON.parse(localStorage.getItem('userMemory'))
	const userName = userMemory ? userMemory : []

	useEffect(() => {
		;(!!user?.length || !!newUser?.length) &&
			!!cardsCount?.length &&
			setIsActiveButton(false)
	}, [user, newUser, cardsCount])

	const valuesReset = () => {
		setIsActiveButton(true)
		setUser('')
		setNewUser('')
		setCardsCount('')
	}

	const handleSetUser = (e) => {
		setUser(e.target.value)
	}

	const handleGotoGame = () => {
		setShowModal()
		if (newUser.length > 0) {
			localStorage.setItem('userMemory', JSON.stringify([...userName, newUser]))
			setUserNameContext(newUser)
		} else {
			setUserNameContext(user)
		}
		setCardsCountContext(cardsCount)
		setIsGameProcessContext(true)
		valuesReset()
	}

	const handleClose = () => {
		setShowModal()
		valuesReset()
	}

	const handleSetNewUser = (e) => {
		setNewUser(e.target.value)
	}

	const handleCardCount = (e) => {
		setCardsCount(e.target.value)
	}

	return (
		<>
			<Modal
				show={show}
				onHide={handleClose}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>Setup</Modal.Title>
				</Modal.Header>
				<Modal.Body className="modal-setup__body">
					<Form>
						<Form.Select className="mb-3" onChange={handleCardCount}>
							<option>Choose the count of cards</option>
							<option value="12">12</option>
							<option value="16">16</option>
							<option value="20">20</option>
							<option value="24">24</option>
						</Form.Select>
						<Form.Select onChange={handleSetUser}>
							<option>Select your user name</option>
							{userName.length !== 0 &&
								userName.map((user) => (
									<option key={user} value={user}>
										{user}
									</option>
								))}
						</Form.Select>
						<p className="mt-3 mb-0 text-center">or</p>
						<Form.Label htmlFor="user">Create new one</Form.Label>
						<Form.Control
							type="text"
							aria-describedby="user"
							onChange={handleSetNewUser}
						/>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="primary"
						onClick={handleGotoGame}
						disabled={isActiveButton}
					>
						Go to game
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default React.memo(SetupModal)
