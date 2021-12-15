import axios from 'axios'

const API_URL = 'https://api.spaceflightnewsapi.net/v3'
const LIMIT = 20

export function getNewArticlesByTitle(search: string, page = 0) {
  return axios
    .request({
      url: `${API_URL}/articles?_limit=${LIMIT}&_start=${
        LIMIT * page
      }&title_contains=${search}`,
    })
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      throw new Error(error)
    })
}

export function getNewArticlesBySummary(search: string, page = 0) {
  return axios
    .request({
      url: `${API_URL}/articles?_limit=${LIMIT}&_start=${
        LIMIT * page
      }&summary_contains=${search}`,
    })
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      throw new Error(error)
    })
}

export function getArticleId(articleId: string) {
  return axios
    .request({
      url: `${API_URL}/articles/${articleId}`,
    })
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      throw new Error(error)
    })
}
