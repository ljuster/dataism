import axios from 'axios';
import qs from 'qs';
import _ from 'lodash/fp';

const getCsrfToken = () => {
  if (typeof document === 'undefined') return null;

  const metas = document.querySelectorAll('meta');
  const token = _.find({ name: 'csrf-token' }, metas);

  if (!token) throw new Error('Missing CSRF TOKEN in head');

  return token.content;
}

axios.defaults.paramsSerializer = (params) => {
  return qs.stringify(params, { arrayFormat: 'brackets' })
}

const request = (path, data = {}, type = 'get') => {
  let params = data
  const headers = {
    'X-CSRF-Token': getCsrfToken()
  }
  if (type === 'get') params = { params }

  return new Promise((resolve) => {
    if (type === 'delete') {
      axios
        .delete(path, { data, headers })
        .then((response) => {
          resolve(response.data || response)
        })
        .catch((error) => {
          // TODO: add sentry/honeybadger
          console.log(error)
        })
      return
    }

    axios[type](path, params, { headers })
      .then((response) => {
        resolve(response.data || response)
      })
      .catch((error) => {
        // TODO: add sentry/honeybadger
        console.log(error)
      })
  })
}

export default {
  get(path, data) {
    return request(path, data, 'get')
  },
  post(path, data) {
    return request(path, data, 'post')
  },
  patch(path, data) {
    return request(path, data, 'patch')
  },
  delete(path, data) {
    return request(path, data, 'delete')
  }
}