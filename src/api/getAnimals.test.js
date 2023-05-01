import axiosClient from '../network/apiClient'
import nock from 'nock'
import { getAnimals } from './getAnimals'

const REACT_APP_BASE_URL = 'https://fed-team.modyo.cloud/api'

const response = [
    {
        'fields': {
            'image': {
                'url': 'https://cloud.modyocdn.com/uploads/4a1b66ba-ba4e-438d-be40-d9960818e06a/original/bear.jpg',
                'tags': [],
                'uuid': '4a1b66ba-ba4e-438d-be40-d9960818e06a',
                'title': 'Bear',
                'alt_text': null,
                'description': null,
                'content_type': 'image/jpeg'
            }
        }
    },
    {
        'fields': {
            'image': {
                'url': 'https://cloud.modyocdn.com/uploads/651e2381-dc33-43fc-8762-58079ffb36d1/original/bird.jpg',
                'tags': [],
                'uuid': '651e2381-dc33-43fc-8762-58079ffb36d1',
                'title': 'Bird',
                'alt_text': null,
                'description': null,
                'content_type': 'image/jpeg'
            }
        }
    }
]

const expectedValue = [
    {
        id: '4a1b66ba-ba4e-438d-be40-d9960818e06a',
        url: 'https://cloud.modyocdn.com/uploads/4a1b66ba-ba4e-438d-be40-d9960818e06a/original/bear.jpg',
        title: 'Bear',
    },
    {
        id: '651e2381-dc33-43fc-8762-58079ffb36d1',
        url: 'https://cloud.modyocdn.com/uploads/651e2381-dc33-43fc-8762-58079ffb36d1/original/bird.jpg',
        title: 'Bird',
    },
]

const getRequestBody = (
	method,
	url,
	data = {},
	headers = {},
	encryptKeys = null,
) => {
	return {
		method,
		url,
		data,
		headers,
		encryptKeys,
	}
}

describe('Get Animals call', () => {
	afterAll(() => {
		nock.cleanAll()
		nock.restore()
	})

	it('getAnimals', async () => {
		const requestBody = getRequestBody('get', '/content/spaces/animals/types/game/entries?per_page=2')

		const useApiMockData = {
			codigo: '200.Portal-Divisas.200',
			mensaje: 'Operación exitosa.',
			entries: response,
		}
		const expectedResult = expectedValue

		nock(`${REACT_APP_BASE_URL}`)
			.defaultReplyHeaders({
				'access-control-allow-origin': '*',
			})
			.get('/content/spaces/animals/types/game/entries?per_page=2')
			.reply(200, useApiMockData)

		axiosClient.get = jest.fn().mockResolvedValue(requestBody)
		const result = await getAnimals(2)

		expect(result.data).toEqual(expectedResult)
	})

    it('getAnimals error', async () => {
		const requestBody = getRequestBody('get', '/content/spaces/animals/types/game/entries?per_page=2')

		nock(`${REACT_APP_BASE_URL}`)
			.defaultReplyHeaders({
				'access-control-allow-origin': '*',
			})
			.persist()
			.get('/content/spaces/animals/types/game/entries?per_page=2')
			.reply(500, { detalles: ['Server error'] })

		axiosClient.get = jest.fn().mockResolvedValue(requestBody)
        const result = await getAnimals(2)

        expect(result.status).toBe(false)
        expect(result.data).toBe(null)
        expect(result.mensaje).toBe('Failed to call')
	})
})
