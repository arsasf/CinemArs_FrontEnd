const initialState = {
  data: [],
  pagination: {},
  isLoading: false,
  isError: false,
  msg: "",
};

const movie = (state = initialState, action) => {
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
        data: action.payload.data.data,
        msg: action.payload.data.msg,
        pagination: action.payload.data.pagination,
      };
    case "GET_ALL_MOVIE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        msg: action.payload.response.data.msg,
        pagination: {},
      };
    case "GET_MOVIE_ID_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_MOVIE_ID_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data[0],
        msg: action.payload.data.msg,
        pagination: action.payload.data.pagination,
      };
    case "GET_MOVIE_ID_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: {},
        msg: action.payload.response.data.msg,
        pagination: {},
      };
    default:
      return state;
  }
};

export default movie;
