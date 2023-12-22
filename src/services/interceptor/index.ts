export async function customFetch(url: any, options: any) {
  let response

  try {
    response = await fetch(url, options)
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      // Refresh token logic
      const refreshToken = localStorage.getItem('refreshToken') // Assuming token is stored in localStorage

      try {
        const refreshResponse = await fetch('/api/refresh-token', {
          method: 'POST',
          headers: { Authorization: `Bearer ${refreshToken}` },
        })

        if (refreshResponse.ok) {
          const newTokens = await refreshResponse.json()
          localStorage.setItem('accessToken', newTokens.accessToken)
          options.headers = options.headers || {}
          options.headers['Authorization'] = `Bearer ${newTokens.accessToken}`

          // Retry the original request with the new access token
          response = await customFetch(url, options)
        } else {
          // Handle refresh token failure
          throw new Error('Failed to refresh token')
        }
      } catch (refreshError) {
        // Handle refresh error
        throw refreshError
      }
    } else {
      // Handle other errors
      throw error
    }
  }

  return response
}
