import store from '../store';
import { baseUrl } from '../configs/index';
console.log(baseUrl)
export async function request(url = '', method = 'GET', data = {}, token = '') {
  return uni
    .request({
      url: `${baseUrl}${url}`,
      data,
      header: {
        Authorization: store.state.user.token
      },
      method
    })
    .then(data => {
      const [error, res] = data;
      if (error) {
        console.log(error);
      }
      return res.data;
    });
}

export async function postAction(url, data = {}) {
  return request(url, 'POST', data);
}

export async function getAction(url, data = {}) {
  return request(url, 'GET', data);
}
