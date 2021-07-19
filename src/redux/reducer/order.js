const initialState = {
  data: {},
  dataBooking: {},
  dataBookingSeat: [],
  dataReports: [],
  dataMovie: [],
  dataHistory: [],
  isLoading: false,
  isError: false,
  msg: "",
};

const order = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_MOVIE_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_ALL_MOVIE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataMovie: action.payload.data.data,
        msg: action.payload.data.msg,
        pagination: action.payload.data.pagination,
      };
    case "GET_ALL_MOVIE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        dataMovie: [],
        msg: action.payload.response.data.msg,
        pagination: {},
      };
    case "GET_BOOKING_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_BOOKING_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "GET_BOOKING_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: {},
        msg: action.payload.response.data.msg,
      };
    case "GET_BOOKING_SEAT_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_BOOKING_SEAT_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataBookingSeat: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "GET_BOOKING_SEAT_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        dataBookingSeat: [],
        msg: action.payload.response.data.msg,
      };
    case "GET_BOOKING_REPORTS_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_BOOKING_REPORTS_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataReports: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "GET_BOOKING_REPORTS_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        dataReports: [],
        msg: action.payload.response.data.msg,
      };
    case "GET_BOOKING_HISTORY_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_BOOKING_HISTORY_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataHistory: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "GET_BOOKING_HISTORY_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        dataHistory: [],
        msg: action.payload.response.data.msg,
      };
    case "CREATE_BOOKING_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "CREATE_BOOKING_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataBooking: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "CREATE_BOOKING_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        dataBooking: {},
        msg: action.payload.response.data.msg,
      };
    default:
      return state;
  }
};

export default order;
