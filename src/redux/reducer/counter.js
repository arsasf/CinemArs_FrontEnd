// initialState untuk menyimpan data ke dalam store berdasarkan feature/reducernya
const initialState = {
  count: 0,
};

// proses reducer yang dijalankan setelah proses action berdasarkan type yang dikirimkan oleh action. yang akan menjalankan proses selanjutnya
const counter = (state = initialState, action) => {
  switch (action.type) {
    case "INCREASE": {
      return {
        ...initialState,
        count: state.count + 1,
      };
    }
    case "DECREASE": {
      return {
        ...initialState,
        count: state.count - 1,
      };
    }
    case "RESET": {
      return {
        ...initialState,
        count: 0,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default counter;
