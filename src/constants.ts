export const apiUrl = process.env?.REACT_APP_API_URL || ``
export const jwtUrl = process.env?.jwtUrl || ``
export const GET_LIKES = (id) => `getLikes/${id}`
