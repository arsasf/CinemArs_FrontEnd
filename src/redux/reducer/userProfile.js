const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  msg: "",
  dataSearch: [],
};

const userProfile = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_BY_ID_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_USER_BY_ID_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "GET_USER_BY_ID_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        msg: action.payload.response.data.msg,
      };
    case "GET_DATA_SEARCH_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_DATA_SEARCH_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataSearch: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "GET_DATA_SEARCH_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        dataSearch: [],
        msg: action.payload.response.data.msg,
      };
    case "UPDATE_USER_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "UPDATE_USER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "UPDATE_USER_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    case "UPDATE_PASSWORD_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "UPDATE_PASSWORD_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "UPDATE_PASSWORD_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    default:
      return state;
  }
};

export default userProfile;
