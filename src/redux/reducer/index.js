import { combineReducers } from "redux";

import counter from "./counter";
import auth from "./auth";
import manageMovie from "./manageMovie";
import userProfile from "./userProfile";

export default combineReducers({
  counter,
  auth,
  manageMovie,
  userProfile,
});
