import { getAction, postAction } from '../utils/request';
export function register(data = {}) {
  return postAction('/Api/User/registerWithWechat', data);
}
export function login(data = {}) {
  return getAction('/Api/User/loginWithWechat', data);
}
export function getDeviceList(data = {}) {
  return getAction('/Api/Device/getDeviceList', data);
}
//设置手机号
export function setUserPhone(data = {}) {
  return postAction('/Api/User/setUserPhone', data);
}
//添加设备
export function addDevice(data = {}) {
  return getAction('/Api/Device/addDevice', data);
}
//删除设备
export function delDevice(data = {}) {
  return getAction('/Api/Device/delDevice', data);
}
//修改手机号和邮箱
export function setUserPhoneOrEmail(data = {}) {
  return getAction('/Api/User/setUserPhoneOrEmail', data);
}
//获取手机邮箱状态是否打开 /Api/User/getUserReceives
export function getUserReceives(data = {}) {
  return getAction('/Api/User/getUserReceives', data);
}
//设置手机邮箱状态
export function setUserReceives(data = {}) {
  return getAction('/Api/User/setUserReceives', data);
}
//获取历史数据 /Api/Data/getDataList
export function getDataList(data = {}) {
  return getAction('/Api/Data/getDataList', data);
}
//保修列表/Api/Repair/getRepairList
export function getRepairList(data = {}) {
  return getAction('/Api/Repair/getRepairList', data);
}