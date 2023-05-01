import React, { createContext, useState } from 'react'

export const AppContext = createContext()

const AppContextProvider = ({ children }) => {
	// Create app context to create comunication between components.
	// Is used to control the states
	const [animalList, setAnimalList] = useState([])
	const [cardsCount, setCardsCount] = useState('')
	const [userName, setUserName] = useState('')
	const [isGameProcess, setIsGameProcess] = useState(false)
	const [isGameFinished, setIsGameFinished] = useState(false)
	const [success, setSuccess] = useState(0)
	const [errors, setErrors] = useState(0)

	const setAnimalListContext = (value) => {
		setAnimalList(value)
	}

	const setCardsCountContext = (value) => {
		setCardsCount(value)
	}

	const setUserNameContext = (value) => {
		setUserName(value)
	}

	const setIsGameProcessContext = (value) => {
		setIsGameProcess(value)
	}

	const setIsGameFinishedContext = (value) => {
		setIsGameFinished(value)
	}

	const setSuccessContext = (value) => {
		setSuccess(value)
	}

	const setErrorsContext = (value) => {
		setErrors(value)
	}

	return (
		<AppContext.Provider
			value={{
				animalList,
				cardsCount,
				userName,
				isGameProcess,
				isGameFinished,
				success,
				errors,
				setAnimalListContext,
				setCardsCountContext,
				setUserNameContext,
				setIsGameProcessContext,
				setIsGameFinishedContext,
				setSuccessContext,
				setErrorsContext,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

export default AppContextProvider
