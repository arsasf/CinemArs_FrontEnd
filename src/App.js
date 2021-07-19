import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import PrivateRoute from "./helpers/PrivateRoute";
import PublicRoute from "./helpers/PublicRoute";

// ===============Learning Live Coding=====================
import BasicReact from "./pages/learning/BasicReact/BasicReact";
import BasicHome from "./pages/learning/Home/Home";
import BasicMovieDetail from "./pages/learning/MovieDetail/MovieDetail";
import BasicRedux from "./pages/learning/BasicRedux/BasicRedux";
// =====================End=================================

// ======================Page CinemArs=====================
import Signup from "./pages/auth/Signup/Signup";
import Signin from "./pages/auth/Signin/Signin";
import Home from "./pages/main/Home/Home";
import LandingPage from "./pages/main/LandingPage/LandingPage";
import MovieDetail from "./pages/main/MovieDetail/MovieDetail";
import Order from "./pages/main/Order/Order";
import Payment from "./pages/main/Payment/Payment";
import Profile from "./pages/main/Profile/Profile";
import ManageMovie from "./pages/main/Admin/ManageMovie/ManageMovie";
import ManagePremiere from "./pages/main/Admin/ManagePremiere/ManagePremiere";
import Dashboard from "./pages/main/Admin/Dashboard/Dashboard";

// ========================End=============================

// ========================Component CinemArs===============
import CinemArsNavbar from "./components/CinemArs/Navbar/Navbar";
import Footers from "./components/CinemArs/Footer/Footer";
import Cards from "./components/CinemArs/Card/Card";
// =========================End=============================

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Switch>
              {/* ================Learning Live Coding=============== */}
              <PublicRoute
                path="/learning/basic-react"
                exact
                component={BasicReact}
              />
              <PrivateRoute
                path="/learning/basic-home"
                exact
                component={BasicHome}
              />
              <Route
                path="/learning/basic-movie-detail/:id"
                exact
                component={BasicMovieDetail}
              />
              <Route
                path="/learning/basic-redux"
                exact
                component={BasicRedux}
              />
              {/* ======================End============================ */}

              {/* ======================Page CinemArs================== */}
              <PublicRoute
                restricted={true}
                path="/signin"
                exact
                component={Signin}
              />
              <PublicRoute path="/signup" exact component={Signup} />
              <PublicRoute path="/" exact component={LandingPage} />
              <PrivateRoute path="/cinemars/home" exact component={Home} />
              <Route
                path="/cinemars/movie-detail/:id"
                exact
                component={MovieDetail}
              />
              <PrivateRoute path="/cinemars/Order" exact component={Order} />
              <PrivateRoute path="/payment" exact component={Payment} />
              <PrivateRoute
                path="/cinemars/profile"
                exact
                component={Profile}
              />
              <PrivateRoute
                path="/cinemars/manage-movie/:id"
                exact
                component={ManageMovie}
              />
              <PrivateRoute
                path="/cinemars/manage-premiere/:id"
                exact
                component={ManagePremiere}
              />
              <PrivateRoute
                path="/cinemars/dashboard"
                exact
                component={Dashboard}
              />
              {/* =======================End========================= */}

              {/* ====================Component CinemArs============= */}
              <Route path="/cinemars/card" exact component={Cards} />
              <Route path="/cinemars/footer" exact component={Footers} />
              <Route path="/cinemars" exact component={CinemArsNavbar} />
              {/* =======================End========================= */}
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
