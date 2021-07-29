import axiosApiIntances from "../../utils/axios";

export const getUserById = (id) => {
  return {
    type: "GET_USER_BY_ID",
    payload: axiosApiIntances.get(`auth/${id}`),
  };
};

export const getDataSearch = (location, movie) => {
  return {
    type: "GET_DATA_SEARCH",
    payload: axiosApiIntances.get(
      `location/user/search?location=${location}&movie=${movie}`
    ),
  };
};

export const updateUser = (formData) => {
  return {
    type: "UPDATE_USER",
    payload: axiosApiIntances.patch(`auth/update-profile`, formData),
  };
};

export const deleteImage = (formData) => {
  return {
    type: "DELETE_IMAGE",
    payload: axiosApiIntances.patch(`auth/delete-image`, formData),
  };
};

export const updatePassword = (form) => {
  return {
    type: "UPDATE_PASSWORD",
    payload: axiosApiIntances.patch(`auth/update-password`, form),
  };
};
