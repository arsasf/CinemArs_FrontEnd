import { Container, Col, Dropdown, Button, Row } from "react-bootstrap";
import styles from "./Dashboard.module.css";
import Navbar from "../../../../components/CinemArs/Navbar/Navbar";
import Footer from "../../../../components/CinemArs/Footer/Footer";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  getBookingReports,
  getAllMovie,
} from "../../../../redux/actions/order";
import { connect } from "react-redux";

function Dashboard(props) {
  const [movie, setMovie] = useState([]);
  const [selectMovie, setSelectMovie] = useState("All Movie");
  const [selectPremiere, setSelectPremiere] = useState("All Premiere");
  const [selectLocation, setSelectLocation] = useState("All Location");
  const [dashboard, setDashboard] = useState(
    props.order.dataReports.length > 0 ? props.order.dataReports : []
  );
  let [setDataDashboard] = useState([]);
  let [setDataMovie] = useState([]);
  const handleSelectMovie = (param) => {
    setSelectMovie(param);
  };
  const handleSelectPremiere = (param) => {
    setSelectPremiere(param);
  };
  const handleSelectLocation = (param) => {
    setSelectLocation(param);
  };

  //* Chart ===============

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "US$ Booking reports 2021",
        data: [
          dashboard.length > 0
            ? dashboard[0].total === null
              ? 0
              : dashboard[0].total
            : 0,
          dashboard.length > 0
            ? dashboard[1].total === null
              ? 0
              : dashboard[1].total
            : 0,
          dashboard.length > 0
            ? dashboard[2].total === null
              ? 0
              : dashboard[2].total
            : 0,
          dashboard.length > 0
            ? dashboard[3].total === null
              ? 0
              : dashboard[3].total
            : 0,
          dashboard.length > 0
            ? dashboard[4].total === null
              ? 0
              : dashboard[4].total
            : 0,
          dashboard.length > 0
            ? dashboard[5].total === null
              ? 0
              : dashboard[5].total
            : 0,
          dashboard.length > 0
            ? dashboard[6].total === null
              ? 0
              : dashboard[6].total
            : 0,
          dashboard.length > 0
            ? dashboard[7].total === null
              ? 0
              : dashboard[7].total
            : 0,
          dashboard.length > 0
            ? dashboard[8].total === null
              ? 0
              : dashboard[8].total
            : 0,
          dashboard.length > 0
            ? dashboard[9].total === null
              ? 0
              : dashboard[9].total
            : 0,
          dashboard.length > 0
            ? dashboard[10].total === null
              ? 0
              : dashboard[10].total
            : 0,
          dashboard.length > 0
            ? dashboard[11].total === null
              ? 0
              : dashboard[11].total
            : 0,
        ],
        fill: false,
        backgroundColor: "#5f2eea",
        borderColor: "#5f2eea",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  //* =========================
  useEffect(() => {
    console.log("running...");
    setDataDashboard();
    setDataMovie();
  }, [setDataDashboard, setDataMovie]);

  setDataDashboard = () => {
    const movieName =
      selectMovie === "Select Movie" || selectMovie === "All Movie"
        ? ""
        : selectMovie;
    const premiereName =
      selectPremiere === "Select Premiere" || selectPremiere === "All Premiere"
        ? ""
        : selectPremiere;
    const locationCity =
      selectLocation === "Select Location" || selectLocation === "All Location"
        ? ""
        : selectLocation;

    props
      .getBookingReports(movieName, premiereName, locationCity)
      .then((res) => {
        setDashboard(res.value.data.data);
        return res.value.data.data;
      })
      .catch((err) => {
        setDashboard([]);
        return err.response.msg;
      });
  };

  setDataMovie = () => {
    const page = 1,
      limit = 1000,
      searchByName = "",
      sort = "movie_name ASC",
      month = "MONTH(movie_release_date)";

    props
      .getAllMovie(page, limit, searchByName, sort, month)
      .then((res) => {
        setMovie(res.value.data.data);
        return res.value.data.data;
      })
      .catch((err) => {
        setMovie([]);
        return err.response.msg;
      });
  };

  const handleFilter = (param1, param2, param3) => {
    const movieName = param1 === "All Movie" ? "" : param1;
    const premiereName = param2 === "All Premiere" ? "" : param2;
    const locationCity = param3 === "All Location" ? "" : param3;
    props
      .getBookingReports(movieName, premiereName, locationCity)
      .then((res) => {
        setDashboard(res.value.data.data);
        return res.value.data.data;
      })
      .catch((err) => {
        setDashboard([]);
        return err.response.msg;
      });
  };

  const handleReset = () => {
    const movieName = "";
    const premiereName = "";
    const locationCity = "";
    props
      .getBookingReports(movieName, premiereName, locationCity)
      .then((res) => {
        setDashboard(res.value.data.data);
        setSelectMovie("All Movie");
        setSelectPremiere("All Premiere");
        setSelectLocation("All Location");
        return res.value.data.data;
      })
      .catch((err) => {
        setDashboard([]);
        return err.response.msg;
      });
  };

  return (
    <>
      <Navbar login={true} user={props.auth.data ? props.auth.data : false} />
      <Container fluid className={styles.fullArea}>
        <Container>
          <Row className={styles.content}>
            <Col lg={7} md={12} sm={12} xs={12} className={styles.left}>
              <h5>Dashboard</h5>
              <Col
                lg={12}
                md={6}
                sm={12}
                xs={12}
                className={styles.boxDashboard}
              >
                <Line data={data} options={options} />
              </Col>
              <Button variant="fff" className={styles.buttonFilter}>
                Download reports
              </Button>
            </Col>
            <Col lg={4} md={12} sm={12} xs={12} className={styles.right}>
              <h5>Filtered</h5>
              <Col lg={12} md={6} sm={12} xs={12} className={styles.boxFilter}>
                <Dropdown className={styles.selectMovie}>
                  <Dropdown.Toggle
                    variant="fff"
                    className={styles.dropdownSelectMovie}
                  >
                    {selectMovie}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className={`${styles.menuListMovie} shadow`}>
                    <Dropdown.Item
                      className={styles.listMovie}
                      onClick={() => handleSelectMovie("All Movie")}
                    >
                      All Movie
                    </Dropdown.Item>
                    {movie.length > 0
                      ? movie.map((item, index) => {
                          return (
                            <Dropdown.Item
                              key={index}
                              className={styles.listMovie}
                              onClick={() => handleSelectMovie(item.movie_name)}
                            >
                              {item.movie_name}
                            </Dropdown.Item>
                          );
                        })
                      : ""}
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown className={styles.selectMovie}>
                  <Dropdown.Toggle
                    variant="fff"
                    className={styles.dropdownSelectMovie}
                  >
                    {selectPremiere}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className={styles.menuListMovie}>
                    <Dropdown.Item
                      className={styles.listMovie}
                      onClick={() => handleSelectPremiere("All Premiere")}
                    >
                      All Premiere
                    </Dropdown.Item>
                    <Dropdown.Item
                      className={styles.listMovie}
                      onClick={() => handleSelectPremiere("CineOne21")}
                    >
                      CineOne21
                    </Dropdown.Item>
                    <Dropdown.Item
                      className={styles.listMovie}
                      onClick={() => handleSelectPremiere("Hiflix")}
                    >
                      Hiflix
                    </Dropdown.Item>
                    <Dropdown.Item
                      className={styles.listMovie}
                      onClick={() => handleSelectPremiere("ebu.id")}
                    >
                      ebu.id
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown className={styles.selectMovie}>
                  <Dropdown.Toggle
                    variant="fff"
                    className={styles.dropdownSelectMovie}
                  >
                    {selectLocation}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className={styles.menuListMovie}>
                    <Dropdown.Item
                      className={styles.listMovie}
                      onClick={() => handleSelectLocation("All Location")}
                    >
                      All Location
                    </Dropdown.Item>
                    <Dropdown.Item
                      className={styles.listMovie}
                      onClick={() => handleSelectLocation("Banjarmasin")}
                    >
                      Bajarmasin
                    </Dropdown.Item>
                    <Dropdown.Item
                      className={styles.listMovie}
                      onClick={() => handleSelectLocation("Banjarbaru")}
                    >
                      Banjarbaru
                    </Dropdown.Item>
                    <Dropdown.Item
                      className={styles.listMovie}
                      onClick={() => handleSelectLocation("Barito Kuala")}
                    >
                      Barito Kuala
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Button
                  variant="fff"
                  className={styles.buttonFilter}
                  onClick={() =>
                    handleFilter(selectMovie, selectPremiere, selectLocation)
                  }
                >
                  Filter
                </Button>
                <Button
                  variant="fff"
                  className={styles.buttonReset}
                  onClick={() => handleReset()}
                >
                  Reset
                </Button>
              </Col>
            </Col>
          </Row>
        </Container>
      </Container>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => ({
  movie: state.movie,
  auth: state.auth,
  premiere: state.premiere,
  order: state.order,
});

const mapDispatchToProps = { getBookingReports, getAllMovie };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
