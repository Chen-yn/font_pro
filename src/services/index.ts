import { request } from '@umijs/max';

export const postUsername = (data: any) => {
  return request('/api/users', {
    method: 'post',
    data,
  });
}

export const getUsername = (params?: any) => {
  return request('/api/users', {
    method: 'get',
    headers: {
      "Cache-Control": "no-cache"
    },
    params,
  });
}

export const getUserTable = (params?: any) => {
  return request('/api/user_table', {
    method: 'get',
    headers: {
      "Cache-Control": "no-cache"
    },
    params
  });
}

export const postUserTable = (data?: any) => {
  return request('/api/user_table', {
    method: 'post',
    headers: {
      "Cache-Control": "no-cache"
    },
    data,
  });
}

export const getCardList = (params?: any) => {
  return request('/api/card_list', {
    method: 'get',
    headers: {
      "Cache-Control": "no-cache"
    },
    params
  });
}
