export type CustomFetchFunction = (
  url: string,
  options?: RequestInit,
) => Promise<Response>
