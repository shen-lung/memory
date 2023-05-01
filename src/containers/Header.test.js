import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import Header from './Header'

jest.mock('react', () => {
	const ActualReact = jest.requireActual('react')
  
	return {
        ...ActualReact,
        useContext: () => ({
			success: 0,
			errors: 0,
        }),
	}
})

describe('Header', () => {
	let container = null

	beforeEach(() => {
		container = document.createElement('div')
		document.body.appendChild(container)
	})

	afterEach(() => {
		unmountComponentAtNode(container)
		container.remove()
		container = null
		jest.restoreAllMocks()
	})

	it('render component', () => {
		act(() => {
			render(<Header />, container)
		})

		const header = document.querySelector('.header')

		expect(header).toBeTruthy()
	})
	
	it('header section', () => {
		act(() => {
			render(<Header />, container)
		})

		const headerGame = document.querySelector('.header-game')

		expect(headerGame).toBeTruthy()
	})
	
	it('hits success', () => {
		act(() => {
			render(<Header />, container)
		})

		const hitsSuccess = document.querySelector('.header-game__success')
		
		expect(hitsSuccess).toBeTruthy()
		expect(hitsSuccess.innerHTML).toEqual('0')
	})
	
	it('hits errors', () => {
		act(() => {
			render(<Header />, container)
		})

		const hitsErrors = document.querySelector('.header-game__error')
		
		expect(hitsErrors).toBeTruthy()
		expect(hitsErrors.innerHTML).toEqual('0')
	})
})
