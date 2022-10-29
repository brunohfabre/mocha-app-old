import axios from 'axios'

export const baseURL =
  window.electron.node_env === 'production'
    ? 'http://165.227.197.107:3333/api'
    : 'http://localhost:3333/api'

console.log('[BASE_URL]: ', baseURL)

const api = axios.create({
  baseURL,
})

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem(`@mocha:token`)

  if (config.headers && token) {
    config.headers.authorization = `Bearer ${JSON.parse(token)}`
  }

  return config
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.data.status === 'auth_error') {
      localStorage.removeItem('@mocha:user')
      localStorage.removeItem('@mocha:token')
      localStorage.removeItem('@mocha:workspace-selected')

      window.location.reload()

      // window.alert(
      //   'You have been signed out for security, please log in again to continue using the mocha.',
      // )
    } else {
      window.alert(
        `${error.response.data.status} | ${JSON.stringify(
          error.response.data.message,
        )}`,
      )
    }

    return Promise.reject(error.response)
  },
)

export { api }
