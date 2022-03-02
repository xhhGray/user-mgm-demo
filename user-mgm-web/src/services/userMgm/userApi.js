import { request } from "../request";

// 创建用户
export const createUser = async (params) => {
  return request("/createUser", params);
};

// 修改用户
export const updateUser = async (params) => {
  return request("/updateUser", params);
};

// 删除用户
export const deleteUser = async (params) => {
  return request("/deleteUser", params);
};

// 查询用户
export const findUser = async (params) => {
  return request("/findUser", params);
};
