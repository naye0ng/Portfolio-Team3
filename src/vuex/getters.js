
// vuex에 대한 getter를 등록.
export default {
  accessToken(state) {
    return state.accessToken
  },
  user(state) {
    return state.user
  },
  key(state) {
    return state.key
  },
  date(state) {
    return state.date
  },
  weather(state) {
    return state.weather
  }
}
