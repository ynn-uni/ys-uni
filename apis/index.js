import { getAction, postAction } from '../utils/request';
//登录/注册
export function loginOrRegisterWithWechat(data = {}) {
  return postAction('/Api/User/loginOrRegisterWithWechat', data);
}
//设备列表
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

//获取产品设备列表
export function getProductCategoryList(data = {}) {
  return getAction('/Api/Product/getProductCategoryList', data);
}
//获取产品设备详情
export function getProductDetails(data = {}) {
  return getAction('/Api/Product/getProductDetails', data);
}
//获取产品列表 
export function getProductList(data = {}) {
  return getAction('/Api/Product/getProductList', data);
}
//添加报修 /Api/Repair/addRepair
export function addRepair(data = {}) {
  return getAction('/Api/Repair/addRepair', data);
}
//历史故障列表 getNoticeList
export function getNoticeList(data = {}) {
  return getAction('/Api/Notice/getErrorList', data);
}
//查看设备备注
export function getDeviceSign(data = {}) {
  return getAction('/Api/Device/getDeviceSign', data);
}
//设定温湿度
export function setDeviceTemperatureOrHumidity(data = {}) {
  return getAction('/Api/Device/setDeviceTemperatureOrHumidity', data);
}
//设定传感器温湿度偏差值Device/setDeviceOffset
export function setDeviceOffset(data = {}) {
  return getAction('/Api/Device/setDeviceOffset', data);
}
//获取传感器温湿偏差Device/getDeviceOffset
export function getDeviceOffset(data = {}) {
  return getAction('/Api/Device/getDeviceOffset', data);
}