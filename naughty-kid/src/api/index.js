import jsonp from 'jsonp'
function api (data) {
  return new Promise((resolve) => {
    jsonp('http://localhost:8080/api/jsonp', data, (_, res) => {
      resolve(res)
    })
  })
}
export default api
