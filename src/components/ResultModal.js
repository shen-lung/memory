import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Modal, Image } from 'react-bootstrap'
import { mainIcons } from '../assets/SectionIcons'

import './ResultModal.scss'

const ResultModal = ({ show, setShowModal }) => {
	const { userName } = useContext(AppContext)

	const handleClose = () => {
		setShowModal()
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
					<Modal.Title>
						Congratulations <span className="fw-bold h-100">{userName}</span>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="modal-result__body">
					<Image
						className="modal-result__image"
						src={mainIcons.iconBrainSuccess}
					/>
				</Modal.Body>
			</Modal>
		</>
	)
}

export default React.memo(ResultModal)
