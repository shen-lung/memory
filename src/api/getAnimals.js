import axiosClient from '../network/apiClient'
import { crudResponse } from '../network/response'
import { GET_ANIMALS_URL } from '../network/env'

export const getAnimals = async (countItems = 15) => {
	try {
		// Using axiosClient metod created with default url
		const response = await axiosClient({
			method: 'get',
			url: `${GET_ANIMALS_URL}?per_page=${countItems}`,
		})

		// Create mapping data when the status is 200 (Success)
		if (response.status === 200) {
			const mappedData = response?.data?.entries.map((item) => {
				return {
					id: item.fields.image.uuid,
					url: item.fields.image.url,
					title: item.fields.image.title,
				}
			})

			// Return custom response
			return crudResponse(true, mappedData, 'Success')
		} else {
			return crudResponse(false, null, 'Failed to call')
		}
	} catch (error) {
		return crudResponse(false, null, 'Failed to call')
	}
}
