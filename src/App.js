import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BasicReact from "./pages/learning/BasicReact/BasicReact";
import BasicHome from "./pages/learning/Home/Home";
import BasicMovieDetail from "./pages/learning/MovieDetail/MovieDetail";
import CinemArsNavbar from "./components/CinemArs/Navbar/Navbar";
import Home from "./pages/main/Home/Home";
// import Search from "./components/CinemArs/Search/Search";
import Cards from "./components/CinemArs/Card/Card";
import Footers from "./components/CinemArs/Footer/Footer";
import MovieDetail from "./pages/main/MovieDetail/MovieDetail";
import Order from "./pages/main/Order/Order";
import Payment from "./pages/main/Payment/Payment";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/learning/basic-react" exact component={BasicReact} />
          <Route path="/learning/basic-home" exact component={BasicHome} />
          <Route
            path="/learning/basic-movie-detail/:id"
            exact
            component={BasicMovieDetail}
          />
          <Route path="/cinemars" exact component={CinemArsNavbar} />
          <Route path="/cinemars/home" exact component={Home} />
          <Route path="/cinemars/Order" exact component={Order} />
          <Route
            path="/cinemars/movie-detail/:id"
            exact
            component={MovieDetail}
          />

          <Route path="/cinemars/payment" exact component={Payment} />
          <Route path="/cinemars/card" exact component={Cards} />
          <Route path="/cinemars/footer" exact component={Footers} />
          {/* <Route path="/cinemars/search" exact component={Search} /> */}
        </Switch>
      </Router>
    );
  }
}

export default App;
