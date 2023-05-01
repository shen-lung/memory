// Custom response
export const crudResponse = (status, data, message) => {
	const resp = {
		status: status,
		data: data,
		mensaje: message,
	}
	return resp
}
