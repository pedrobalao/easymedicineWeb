let http = require('@/api/http')

export function medicalcalculations () {
  let url = '/medicalcalculations'
  return http.get(process.env.API_BASE_URL + url)
}
