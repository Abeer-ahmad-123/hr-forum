export type CustomFetchFunction = (
  url: string,
  options?: RequestInit,
) => Promise<Response>
export type FailedAPIResponse = {
  success: false
  errors: Array<string>
  internal: string
}
export type SuccessAPIResponse<T = object> = {
  data: T
  success: true
}

export type APIResponse<T = object> = SuccessAPIResponse<T> | FailedAPIResponse
