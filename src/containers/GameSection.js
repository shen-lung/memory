import React, { useState, useEffect, useContext } from 'react'
import { getAnimals } from '../api/getAnimals'
import { AppContext } from '../context/AppContext'
import Card from '../components/Card'

import './GameSection.scss'

// Game section where we show the game's process
const GameSection = () => {
	const {
		animalList,
		cardsCount,
		isGameFinished,
		success,
		errors,
		setAnimalListContext,
		setIsGameFinishedContext,
		setSuccessContext,
		setErrorsContext,
	} = useContext(AppContext)

	const [choices, setChoices] = useState([])
	const [tableConfiguration, setTableConfiguration] = useState([])
	const [cardSuccess, setCardSuccess] = useState([])

	const cardsPerGame = Number(cardsCount) / 2

	const handleTableConfiguration = (list) => {
		const table = {}
		const tableList = []

		while (Object.keys(table).length < cardsPerGame) {
			const random = Math.floor(Math.random() * list.length)
			const element = list[random]

			if (table[random] === undefined) table[random] = element
		}

		for (const key in table) {
			tableList.push(table[key])
		}

		// Fill the game's table with random position of images
		const gameTableConfiguration = [...tableList, ...tableList]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({ ...card }))

		return gameTableConfiguration
	}

	const handleGetAllUsers = async () => {
		// Calling the API to get the animals if the animal list is empty
		if (!animalList?.length) {
			const allAnimalsResponse = await getAnimals()

			// We store the information if the response status is ok
			if (allAnimalsResponse.status) {
				setAnimalListContext(allAnimalsResponse.data)
			} else {
				alert(allAnimalsResponse.mensaje)
			}

			setTableConfiguration(handleTableConfiguration(allAnimalsResponse.data))
		} else {
			setTableConfiguration(handleTableConfiguration(animalList))
		}
	}

	useEffect(() => {
		handleGetAllUsers()
	}, [])

	useEffect(() => {
		if (choices.length === 2) {
			if (choices[0] === choices[1]) {
				setSuccessContext(success + 1)
				setCardSuccess([...cardSuccess, choices[0]])
			} else {
				setErrorsContext(errors + 1)
			}

			setChoices([])
		}

		if (success === cardsPerGame) setIsGameFinishedContext(!isGameFinished)
	}, [choices])

	const handleChoice = (image) => {
		choices.length <= 2 && setChoices([...choices, image.id])
	}

	return (
		<div className="col col-sm-12 col-md-7 d-flex flex-wrap justify-content-around align-items-center p-2 game">
			{tableConfiguration.map((image, index) => (
				<Card
					key={index}
					image={image}
					cardsCount={cardsCount}
					handleChoice={handleChoice}
					cardSuccessList={cardSuccess}
				/>
			))}
		</div>
	)
}

export default GameSection
