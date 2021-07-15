import { combineReducers } from "redux";

import counter from "./counter";
import auth from "./auth";
import manageMovie from "./manageMovie";
import movie from "./movie";
import premiere from "./premiere";
import order from "./order";
import userProfile from "./userProfile";

export default combineReducers({
  counter,
  auth,
  movie,
  premiere,
  order,
  manageMovie,
  userProfile,
});
