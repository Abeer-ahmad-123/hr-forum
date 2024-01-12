export async function getSearchPosts({
  search = '',
  userID,
  channelID,
  page = 1,
  pageSize = 10,
}: GET_ALL_POSTS_SEARCH_TYPE) {
  try {
    let url = `${SEARCH_POST_URL}?query=${search}`

    if (channelID) {
      url += `&channelId=${channelID}`
    }
    if (userID) {
      url += `&userId=${userID}`
    }

    url += `&page=${page}&pageSize=${pageSize}`
    let res = await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
    const response = await res.json()
    return response
  } catch (err) {
    throw err
  }
}
