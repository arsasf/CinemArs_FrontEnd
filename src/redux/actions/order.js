import axiosApiIntances from "../../utils/axios";

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

export const createBooking = (data) => {
  return {
    type: "CREATE_BOOKING",
    payload: axiosApiIntances.post("booking/", data),
  };
};
