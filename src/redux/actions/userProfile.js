import axiosApiIntances from "../../utils/axios";

export const getUserById = (id) => {
  return {
    type: "GET_USER_BY_ID",
    payload: axiosApiIntances.get(`auth/${id}`),
  };
};

export const updateUser = (id, formData) => {
  return {
    type: "UPDATE_USER",
    payload: axiosApiIntances.patch(`auth/update-profile/${id}`, formData),
  };
};

export const updatePassword = (id, form) => {
  return {
    type: "UPDATE_PASSWORD",
    payload: axiosApiIntances.patch(`auth/update-password/${id}`, form),
  };
};
