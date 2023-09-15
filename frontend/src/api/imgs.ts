import { api } from './api'

export const getImgs = (params: any) => {
  return api({
    url: '/getImgs/dir',
    method: 'post',
    data: JSON.stringify(params),
  })
}

export const addFood = (params: any) => {
  return api({
    url: '/food/save',
    method: 'post',
    data: JSON.stringify(params),
  })
}

export const getPresent = (params: any) => {
  return api({
    url: '/present/page',
    method: 'post',
    data: JSON.stringify(params),
  })
}

export const addPresent = (params: any) => {
  return api({
    url: '/present/save',
    method: 'post',
    data: JSON.stringify(params),
  })
}

export const getFood = (params: any) => {
  return api({
    url: '/food/page',
    method: 'post',
    data: JSON.stringify(params),
  })
}

export const addDrink = (params: any) => {
  return api({
    url: '/drink/save',
    method: 'post',
    data: JSON.stringify(params),
  })
}

export const getDrink = (params: any) => {
  return api({
    url: '/drink/page',
    method: 'post',
    data: JSON.stringify(params),
  })
}
export const addMedicine = (params: any) => {
  return api({
    url: '/medicine/save',
    method: 'post',
    data: JSON.stringify(params),
  })
}

export const getMedicine = (params: any) => {
  return api({
    url: '/medicine/page',
    method: 'post',
    data: JSON.stringify(params),
  })
}


export const chat = (params: any) => {
  return api({
    url: '/interaction/chat',
    method: 'post',
    data: JSON.stringify(params),
  })
}