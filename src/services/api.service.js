import axios from "./axios.customize";
const createUserAPI = (fullName, email, password, phone) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
  };
  return axios.post(URL_BACKEND, data);
};
const fetchAllUserAPI = (current, pageSize) => {
  const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
  return axios.get(URL_BACKEND);
};
const updateUserAPI = (_id, fullName, phone, avatar) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    _id: _id,
    fullName: fullName,
    phone: phone,
    avatar: avatar,
  };
  return axios.put(URL_BACKEND, data);
};
const deleteUserAPI = (_id) => {
  const URL_BACKEND = `/api/v1/user/${_id}`;
  return axios.delete(URL_BACKEND);
};
const handleUploadFile = (file, folder) => {
  const URL_BACKEND = `/api/v1/file/upload`;
  let config = {
    headers: {
      "upload-type": folder,
      "Content-Type": "multipart/form-data",
    },
  };
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", file);
  return axios.post(URL_BACKEND, bodyFormData, config);
};
const registerUserAPI = (fullName, email, password, phone) => {
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: password,
  };
  const URL_BACKEND = `/api/v1/user/register`;
  return axios.post(URL_BACKEND, data);
};
const loginAPI = (email, password) => {
  const URL_BACKEND = `/api/v1/auth/login`;
  const data = {
    username: email,
    password: password,
    delay: 500,
  };
  return axios.post(URL_BACKEND, data);
};

const getAccountAPI = () => {
  const URL_BACKEND = `/api/v1/auth/account`;
  return axios.get(URL_BACKEND);
};
const logoutAPI = () => {
  const URL_BACKEND = "/api/v1/auth/logout";
  return axios.post(URL_BACKEND);
};

const fetchAllBookAPI = (current, pageSize) => {
  const URL_BACKEND = `/api/v1/book/?current=${current}&pageSize=${pageSize}`;
  return axios.get(URL_BACKEND);
};
const createBookAPI = (
  thumbnail,
  mainText,
  author,
  price,
  quantity,
  category,
) => {
  const URL_BACKEND = "/api/v1/book";
  const data = {
    thumbnail: thumbnail,
    mainText: mainText,
    author: author,
    price: price,
    quantity: quantity,
    category: category,
  };
  return axios.post(URL_BACKEND, data);
};
const updatedBookAPI = (
  _id,
  thumbnail,
  mainText,
  author,
  price,
  quantity,
  category,
) => {
  const URL_BACKEND = "/api/v1/book";
  const data = {
    _id: _id,
    thumbnail: thumbnail,
    mainText: mainText,
    author: author,
    price: price,
    quantity: quantity,
    category: category,
  };
  return axios.put(URL_BACKEND, data);
};
const deleteBookAPI = (_id) => {
  const URL_BACKEND = `/api/v1/book/${_id}`;
  return axios.delete(URL_BACKEND);
};
export {
  createUserAPI,
  updateUserAPI,
  fetchAllUserAPI,
  deleteUserAPI,
  handleUploadFile,
  registerUserAPI,
  loginAPI,
  getAccountAPI,
  logoutAPI,
  fetchAllBookAPI,
  createBookAPI,
  updatedBookAPI,
  deleteBookAPI,
};
