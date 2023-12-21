import { UPLOAD_USER_IMAGE } from './routes'

class UploadImage {
  async uploadUserImage(body: FormData) {
    try {
      const responseFromRefresh = await fetch(UPLOAD_USER_IMAGE, {
        body,
        method: 'post',
      })

      const responseJson = await responseFromRefresh.json()
      return responseJson
    } catch (err) {
      throw err
    }
  }
}
export default UploadImage
