import axios from "axios";

/* const API = process.env.URL; */
const API = "http://localhost:3001";

///////////// Get Services ///////////////////////////////////////

export const getLoginService = async (data) => {
  return await axios.post(`${API}/login`, data);
};

export const getProductsService = async () => {
  return await axios.get(`${API}/product`);
};

export const getCategorysService = async () => {
  return await axios.get(`${API}/category`);
};

export const getMainpageService = async () => {
  return await axios.get(`${API}/mainpage`);
};

export const getSliceImgPageService = async () => {
  return await axios.get(`${API}/gallery`);
};

export const getInformationPageService = async () => {
  return await axios.get(`${API}/information`);
};

export const getColorsService = async () => {
  return await axios.get(`${API}/colors`);
};

///////////// Post Services ///////////////////////////////////////
export const postCategorysService = async (data, token) => {
  return await axios.post(`${API}/category`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const postProductsService = async (data, token) => {
  return await axios.post(`${API}/product`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const postMainPageService = async (data, token) => {
  return await axios.post(`${API}/mainpage`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const postInformationService = async (data, token) => {
  return await axios.post(`${API}/information`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const postGalleryService = async (data, token) => {
  return await axios.post(`${API}/gallery`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const postColorsService = async (data, token) => {
  return await axios.post(`${API}/colors`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
///////////// Put Services ///////////////////////////////////////

export const putInformationService = async (data, token) => {
  return await axios.put(`${API}/information`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const putColorService = async (data, token, id) => {
  return await axios.put(`${API}/colors/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

///////////// Delete Services ///////////////////////////////////////
export const deleteMainPageService = async (data, token) => {
  return await axios.delete(`${API}/mainpage/${data}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const deleteGalleryService = async (data, token) => {
  return await axios.delete(`${API}/gallery/${data}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const deleteProductService = async (data, token) => {
  return await axios.delete(`${API}/product/${data}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const deleteCategoryService = async (data, token) => {
  return await axios.delete(`${API}/category/${data}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
