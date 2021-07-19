import axiosApiIntances from "../../utils/axios";

export const getAllPremiere = (
  id,
  page,
  limit,
  sort,
  searchByLocation,
  searchByDate
) => {
  return {
    type: "GET_ALL_PREMIERE",
    payload: axiosApiIntances.get(
      `premiere/movie/${id}?page=${page}&limit=${limit}&sort=${sort}&searchByLocation=${searchByLocation}&searchByDate=${searchByDate}`
    ),
  };
};

export const getAllPremiereSearch = (
  id,
  page,
  limit,
  sort,
  searchByLocation,
  searchByDate
) => {
  return {
    type: "GET_ALL_PREMIERE",
    payload: axiosApiIntances.get(
      `premiere/movie-search/${id}?page=${page}&limit=${limit}&sort=${sort}&searchByLocation=${searchByLocation}&searchByDate=${searchByDate}`
    ),
  };
};
