import React, { useState, useEffect } from 'react'
import { mainIcons } from '../assets/SectionIcons'
import { scopeDimensions } from '../constants'

import './Card.scss'

// Card section where we show the item
const Card = ({ image, handleChoice, cardsCount, cardSuccessList }) => {
	const [isFlipped, setIsFlipped] = useState(false)

	useEffect(() => {
		if (isFlipped) {
			setTimeout(() => setIsFlipped(!isFlipped), 800)
		}
	}, [isFlipped])

	const imageSuccess =
		cardSuccessList.indexOf(image.id) !== -1
			? 'card-img__image-front-success'
			: 'card-img__image-front'

	const handleFlippe = () => {
		if (cardSuccessList.indexOf(image.id) !== -1) return

		setIsFlipped(!isFlipped)
		handleChoice(image)
	}

	return (
		<div
			className="card-img"
			style={{ ...scopeDimensions[cardsCount] }}
			onClick={handleFlippe}
		>
			<div className={isFlipped ? 'card-img__flipped' : 'card-img__no-flipped'}>
				<div
					key={image.id}
					className={`rounded float-right card-img__image ${imageSuccess}`}
					style={{ backgroundImage: `url(${image.url})` }}
				></div>
				<div
					key={`${image.id}back`}
					className="rounded float-right card-img__image card__image-back"
					style={{
						backgroundImage: `url(${mainIcons.iconQuestion})`,
						backgroundColor: 'cadetblue',
					}}
				></div>
			</div>
		</div>
	)
}

export default React.memo(Card)
