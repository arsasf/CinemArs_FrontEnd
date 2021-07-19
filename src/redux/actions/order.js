import axiosApiIntances from "../../utils/axios";

export const getAllMovie = (page, limit, searchByName, sort, month) => {
  return {
    type: "GET_ALL_MOVIE",
    payload: axiosApiIntances.get(
      `movie?page=${page}&limit=${limit}&searchByName=${searchByName}&sort=${sort}&month=${month}`
    ),
  };
};

export const getBooking = (movieId, premiereId, showTimeId) => {
  return {
    type: "GET_BOOKING",
    payload: axiosApiIntances.get(
      `booking?movieId=${movieId}&premiereId=${premiereId}&showTimeId=${showTimeId}`
    ),
  };
};

export const getBookingSeat = () => {
  return {
    type: "GET_BOOKING_SEAT",
    payload: axiosApiIntances.get(`/bookingseat`),
  };
};

export const getBookingReports = (movie, premiere, location) => {
  return {
    type: "GET_BOOKING_REPORTS",
    payload: axiosApiIntances.get(
      `/booking/admin/dashboard/?movieName=${movie}&premiereName=${premiere}&locationCity=${location}`
    ),
  };
};

export const getBookingHistory = () => {
  return {
    type: "GET_BOOKING_HISTORY",
    payload: axiosApiIntances.get(`booking/user/order-history`),
  };
};

export const createBooking = (data) => {
  return {
    type: "CREATE_BOOKING",
    payload: axiosApiIntances.post("booking/", data),
  };
};
