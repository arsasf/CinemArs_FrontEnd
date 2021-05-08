import axiosApiIntances from "../../utils/axios";

export const getAllMovie = (page, limit, searchByName, sort, month) => {
  return {
    type: "GET_ALL_MOVIE",
    payload: axiosApiIntances.get(
      `movie?page=${page}&limit=${limit}&searchByName=${searchByName}&sort=${sort}&month=${month}`
    ),
  };
};

export const createMovie = (formData) => {
  return {
    type: "CREATE_MOVIE",
    payload: axiosApiIntances.post("movie/", formData),
  };
};
