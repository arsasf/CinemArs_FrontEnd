const initialState = {
  data: [],
  pagination: {},
  isLoading: false,
  isError: false,
  msgGet: "",
  msgCreate: "",
  msgUpdate: "",
  msgDelete: "",
};

const manageMovie = (state = initialState, action) => {
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
        msgGet: action.payload.data.msg,
        pagination: action.payload.data.pagination,
      };
    case "GET_ALL_MOVIE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        msgGet: action.payload.response.data.msg,
        pagination: {},
      };
    case "CREATE_MOVIE_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "CREATE_MOVIE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msgCreate: action.payload.data.msg,
      };
    case "CREATE_MOVIE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msgCreate: action.payload.response.data.msg,
      };
    default:
      return state;
  }
};

export default manageMovie;
