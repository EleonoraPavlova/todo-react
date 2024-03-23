import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true, //есть валидац токен, цепляю куку!
  headers: {
    'API-KEY': 'da75ba21-ff7d-45de-8bae-e8c163a0a2e8',
  },
})
