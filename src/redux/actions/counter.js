export const increaseCounter = () => {
  return {
    //   type   = penamaan feature
    //   payload = menjalankan proses axios
    type: "INCREASE", // type juga didigunakan untuk proses di dalam reducer
  };
};

export const decreaseCounter = () => {
  return {
    type: "DECREASE",
  };
};

export const resetCounter = () => {
  return {
    type: "RESET",
  };
};
