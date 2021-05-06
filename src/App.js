import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import PrivateRoute from "./helpers/PrivateRoute";
import PublicRoute from "./helpers/PublicRoute";

// ===============Learning Live Coding=====================
import BasicReact from "./pages/learning/BasicReact/BasicReact";
import BasicHome from "./pages/learning/Home/Home";
import BasicMovieDetail from "./pages/learning/MovieDetail/MovieDetail";
import BasicRedux from "./pages/learning/BasicRedux/BasicRedux";
import Login from "./pages/auth/Login/Login";
// =====================End=================================

// ======================Page CinemArs=====================
import Signin from "./pages/auth/Signin/Signin";
import Home from "./pages/main/Home/Home";
import MovieDetail from "./pages/main/MovieDetail/MovieDetail";
import Order from "./pages/main/Order/Order";
import Payment from "./pages/main/Payment/Payment";
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
        <Router>
          <Switch>
            {/* ================Learning Live Coding=============== */}
            <PublicRoute
              restricted={true}
              path="/login"
              exact
              component={Login}
            />
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
            <Route path="/learning/basic-redux" exact component={BasicRedux} />
            {/* ======================End============================ */}

            {/* ======================Page CinemArs================== */}
            <Route path="/signin" exact component={Signin} />
            <Route path="/cinemars/home" exact component={Home} />
            <Route
              path="/cinemars/movie-detail/:id"
              exact
              component={MovieDetail}
            />
            <Route path="/cinemars/Order" exact component={Order} />
            <Route path="/cinemars/payment" exact component={Payment} />
            {/* =======================End========================= */}

            {/* ====================Component CinemArs============= */}
            <Route path="/cinemars/card" exact component={Cards} />
            <Route path="/cinemars/footer" exact component={Footers} />
            <Route path="/cinemars" exact component={CinemArsNavbar} />
            {/* =======================End========================= */}
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
