import { Component } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import NavBar from "../../../components/CinemArs/Navbar/Navbar";
import Footer from "../../../components/CinemArs/Footer/Footer";
import styles from "./MovieDetail.module.css";
import axiosApiIntances from "../../../utils/axios";
import CardMovie from "../../../components/CinemArs/CardMovie/CardMovie";
import Bioskop from "../../../components/CinemArs/CardBioskop/Bioskop";
// import Bioskop from "../../../components/CinemArs/CardBioskop/Bioskop";
// import dateFormat from "dateformat";

class movieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      data: [],
      dataPremiere: [],
      pagination: "",
      paginationPremiere: "",
      page: 1,
      limit: 6,
      limitShowing: 5,
      sort: "premiere.premiere_id ASC",
      searchByName: "",
      searchByDate: "",
      month: "month(now())",
      isLoading: false,
      id: "",
    };
  }

  componentDidMount() {
    console.log("Get Data !");
    const { id } = this.props.match.params;
    console.log({ id });
    // ==========untuk page movie detai ===========
    // Proses get data movie by id
    // Proses get data premiere by id
    this.getDataMovieById(id);
    this.getDataBioskopById(id);
  }

  getDataMovieById = () => {
    const { id } = this.props.match.params;
    this.setState({ isLoading: true });
    axiosApiIntances
      .get(`movie/${id}`)
      .then((res) => {
        this.setState({
          data: res.data.data,
          pagination: res.data.pagination,
        });
      })
      .catch((err) => {
        console.log(err.response);
      })
      .finally(() => {
        setTimeout(() => {
          this.setState({ isLoading: false });
        }, 1000);
      });
  };

  getDataBioskopById = () => {
    console.log("Get Data Bioskop Movie");
    const { id } = this.props.match.params;
    const { page, limit, sort, searchByName, searchByDate } = this.state;
    this.setState({ isLoading: true });
    axiosApiIntances
      .get(
        `premiere/${id}?page=${page}&limit=${limit}&sort=${sort}&searchByName=${searchByName}&searchByDate=${searchByDate}`
      )
      .then((res) => {
        this.setState({
          dataPremiere: res.data.data,
          paginationPremiere: res.data.pagination,
        });
      })
      .catch((err) => {
        console.log(err.response);
      })
      .finally(() => {
        setTimeout(() => {
          this.setState({ isLoading: false });
        }, 1000);
      });
  };
  // changeDate = (movie_release_date) => {
  //   this.setState(
  //     {
  //       movie_release_date: dateFormat(movie_release_date, "mmmm dS, yyyy"),
  //     },
  //     () => {
  //       this.getDataById();
  //     }
  //   );
  // };

  handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    this.setState({ page: selectedPage }, () => {
      this.getDataBioskopById();
    });
  };
  render() {
    const { isLoading } = this.state.data;
    const { totalpage } = this.state.paginationPremiere;
    return (
      <>
        <NavBar />
        <Container fluid className={styles.containerCenter}>
          <Row className={styles.rowHome}>
            {/* <!-- =================Content1============--> */}
            {isLoading ? (
              <Col md={12}>
                <Spinner animation="border" variant="primary" />
              </Col>
            ) : (
              this.state.data.map((item, index) => {
                return <CardMovie data={item} key={index} />;
              })
            )}
            {/* <!-- akhir Content1======================= --> */}
            {/* <!-- ===============Content2============== --> */}
            <Container fluid className={styles.content2}>
              <Container className={styles.container}>
                <Row className={styles.row}>
                  <Row className={styles.dateficker}>
                    <div className={styles.datePlace}>
                      <h1>Showtimes and Tickets</h1>
                      <div className="form-date-place">
                        <Row
                          className={`${styles.rowDateficker} g-2 align-items-center`}
                        >
                          <Col className="col-auto">
                            <input
                              type="date"
                              name="begin"
                              placeholder="dd-mm-yyyy"
                              defaultValue=""
                              min="1997-01-01"
                              max="2030-12-31"
                              className="form-control"
                            />
                          </Col>
                          <Col className="col-auto">
                            <input
                              type="text"
                              defaultValue=""
                              className="form-control"
                            />
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Row>
                  <Row>
                    <Container fluid className={styles.containerFluid}>
                      <Container>
                        <Row className={styles.row2}>
                          {isLoading ? (
                            <Col md={12}>
                              <Spinner animation="border" variant="primary" />
                            </Col>
                          ) : (
                            this.state.dataPremiere.map((item, index) => {
                              return (
                                <Bioskop dataPremiere={item} key={index} />
                              );
                            })
                          )}
                          <Container
                            className={`${styles.content21}  d-flex justify-content-between`}
                          >
                            <ReactPaginate
                              previousLabel={"prev"}
                              nextLabel={"next"}
                              breakLabel={"..."}
                              breakClassName={"break-me"}
                              pageCount={totalpage}
                              marginPagesDisplayed={2}
                              pageRangeDisplayed={5}
                              onPageChange={this.handlePageClick}
                              containerClassName={styles.pagination}
                              subContainerClassName={`${styles.pages} ${styles.pagination}`}
                              activeClassName={styles.active}
                            />
                          </Container>
                        </Row>
                      </Container>
                    </Container>
                  </Row>
                </Row>
              </Container>
            </Container>
          </Row>
        </Container>
        <Footer />
      </>
    );
  }
}

export default movieDetail;
