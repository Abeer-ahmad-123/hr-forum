import { API_BASE_URL } from '..'

const AUTH_WITH_EMAIL = API_BASE_URL + '/auth/login'
const AUTH_REGISTER = API_BASE_URL + '/auth/register'
const AUTH_LOGOUT = API_BASE_URL + '/auth/logout'
const AUTH_UPDATE_PASSWORD = API_BASE_URL + '/auth/updatePassword'
const AUTH_REFRESH_TOKEN = API_BASE_URL + '/auth/refreshToken'
const AUTH_GET_USER_DETAILS = API_BASE_URL + '/auth/getUserDetails'
const AUTH_UPDATE_USER_DETAILS = API_BASE_URL + '/auth/updateUserDetails'
const GOOGLE_AUTH_START = API_BASE_URL + '/auth/google/start-auth'
const GOOGLE_EXCHANGE_CODE = API_BASE_URL + '/auth/google/exchange-code'
const AUTH_IS_TOKEN_EXPIRED = API_BASE_URL + '/auth/isTokenExpired'
const GOOGLE_REGISTER = API_BASE_URL + '/auth/google/register'

export {
  AUTH_GET_USER_DETAILS,
  AUTH_IS_TOKEN_EXPIRED,
  AUTH_LOGOUT,
  AUTH_REFRESH_TOKEN,
  AUTH_REGISTER,
  AUTH_UPDATE_PASSWORD,
  AUTH_UPDATE_USER_DETAILS,
  AUTH_WITH_EMAIL,
  GOOGLE_AUTH_START,
  GOOGLE_EXCHANGE_CODE,
  GOOGLE_REGISTER,
}
