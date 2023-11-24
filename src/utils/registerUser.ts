export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const responseFromRegister = await fetch(`/auth/register`, {
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      method: 'post',
    })
    const responseJson = await responseFromRegister.json()

    if (responseJson.data.success) {
      return {
        success: true,
        data: responseJson.data,
      }
    } else {
      return {
        success: false,
        error: responseJson.data,
      }
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    }
  }
}
