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
        tip("系统错误");
      }
      if (res.data.status == 0) {
        return res.data;
      } else {
        handleError(res.data);
        return Promise.reject(res.data);
      }
      // return res.data;
    });
}

export async function postAction(url, data = {}) {
  return request(url, 'POST', data);
}

export async function getAction(url, data = {}) {
  return request(url, 'GET', data);
}
function handleError(response) {
  const { msg, status } = response;
  switch (status) {
    case 401:
      tip("未授权，请重新登录！");
    default:
      tip(msg);
  }
}

function tip(msg = "未知错误") {
  uni.showToast({
    title: msg,
    icon: "none"
  });
}