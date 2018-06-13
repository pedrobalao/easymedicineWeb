
export const loadingStarted = ({ commit }) => {
  commit('updateLoadingStatus', true)
}

export const loadingFinished = ({ commit }) => {
  commit('updateLoadingStatus', false)
}
