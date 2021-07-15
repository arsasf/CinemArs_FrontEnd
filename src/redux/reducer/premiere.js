const initialState = {
  data: [],
  pagination: {},
  isLoading: false,
  isError: false,
  msg: "",
};

const premiere = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_PREMIERE_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_ALL_PREMIERE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
        pagination: action.payload.data.pagination,
      };
    case "GET_ALL_PREMIERE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        msg: action.payload.response.data.msg,
        pagination: {},
      };
    default:
      return state;
  }
};

export default premiere;
