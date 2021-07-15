const initialState = {
  data: {},
  dataBooking: {},
  dataBookingSeat: [],
  isLoading: false,
  isError: false,
  msg: "",
};

const order = (state = initialState, action) => {
  switch (action.type) {
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
