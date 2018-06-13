import axios from 'axios'

import store from '@/store'

export function get (url) {
  store.dispatch('loading/loadingStarted')
  return new Promise((resolve, reject) => {
    axios.get(url).then((response) => {
      store.dispatch('loading/loadingFinished')

      resolve(response)
    }).catch((e) => {
      store.dispatch('loading/loadingFinished')

      reject(e)
    })
  })
}
