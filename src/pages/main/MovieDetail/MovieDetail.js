import { Component } from "react";
import { Container, Row, Form, Dropdown } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import NavBar from "../../../components/CinemArs/Navbar/Navbar";
import Footer from "../../../components/CinemArs/Footer/Footer";
import styles from "./MovieDetail.module.css";
import CardMovie from "../../../components/CinemArs/CardMovie/CardMovie";
import Bioskop from "../../../components/CinemArs/CardBioskop/Bioskop";
import { getMovieById } from "../../../redux/actions/movie";
import {
  getAllPremiere,
  getAllPremiereSearch,
} from "../../../redux/actions/premiere";
import { connect } from "react-redux";

class movieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataPremiere: [],
      totalPage: 0,
      page: 1,
      limit: 6,
      sort: "premiere.premiere_id ASC",
      searchByLocation: "",
      searchByDate: "premiere.show_time_date",
      showDate: new Date().toISOString().slice(0, 10),
      setLocation: "All Location",
      oldItem: null,
    };
  }

  componentDidMount() {
    this.getDataMovieById();
    this.getDataBioskopById();
  }

  getDataMovieById = () => {
    const { id } = this.props.match.params;
    this.props
      .getMovieById(id)
      .then((res) => {
        this.setState({
          ...this.state,
          data: res.value.data.data,
        });
      })
      .catch((err) => {
        if (err) {
          return [];
        }
      });
  };

  getDataBioskopById = () => {
    const { id } = this.props.match.params;
    const searchByDate = this.state.showDate;
    const { page, limit, sort, searchByLocation } = this.state;
    this.props
      .getAllPremiereSearch(
        id,
        page,
        limit,
        sort,
        searchByLocation,
        searchByDate
      )
      .then((res) => {
        this.setState({
          ...this.state,
          dataPremiere: res.value.data.data,
          totalPage: res.value.data.pagination.totalpage,
        });
      })
      .catch((err) => {
        return [];
      });
  };

  handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    this.setState({ page: selectedPage }, () => {
      this.getDataBioskopById();
    });
  };

  handleSearchByDate = (event, search) => {
    if (search === "") {
      this.setState({
        ...this.state,
        [event.target.name]: event.target.value,
      });
      const { id } = this.props.match.params;
      const searchByDate = event.target.value;
      const searchByLocation = search;

      const { page, limit, sort } = this.state;
      this.props
        .getAllPremiereSearch(
          id,
          page,
          limit,
          sort,
          searchByLocation,
          searchByDate
        )
        .then((res) => {
          this.setState({
            ...this.state,
            dataPremiere: res.value.data.data,
            totalPage: res.value.data.pagination.totalpage,
          });
        })
        .catch((err) => {
          this.setState({
            ...this.state,
            dataPremiere: [],
          });
        });
    } else {
      if (search === "All Location") {
        this.setState({
          ...this.state,
          setLocation: "",
        });
        const { id } = this.props.match.params;
        const searchByDate = event;
        const searchByLocation = "";

        const { page, limit, sort } = this.state;
        this.props
          .getAllPremiereSearch(
            id,
            page,
            limit,
            sort,
            searchByLocation,
            searchByDate
          )
          .then((res) => {
            this.setState({
              ...this.state,
              dataPremiere: res.value.data.data,
              totalPage: res.value.data.pagination.totalpage,
            });
          })
          .catch((err) => {
            this.setState({
              ...this.state,
              dataPremiere: [],
            });
          });
      }
      this.setState({
        ...this.state,
        setLocation: search,
      });
      const { id } = this.props.match.params;
      const searchByDate = event;
      const searchByLocation = search;

      const { page, limit, sort } = this.state;
      this.props
        .getAllPremiereSearch(
          id,
          page,
          limit,
          sort,
          searchByLocation,
          searchByDate
        )
        .then((res) => {
          this.setState({
            ...this.state,
            dataPremiere: res.value.data.data,
            totalPage: res.value.data.pagination.totalpage,
          });
        })
        .catch((err) => {
          this.setState({
            ...this.state,
            dataPremiere: [],
          });
        });
    }
  };

  handleChoose = (data) => {
    this.setState({
      ...this.state,
      oldItem: data,
    });
  };
  render() {
    const { data, dataPremiere, setLocation, showDate } = this.state;
    return (
      <>
        <NavBar
          login={true}
          user={this.props.auth.data ? this.props.auth.data : false}
        />
        <Container fluid className={styles.containerCenter}>
          <Row className={styles.rowHome}>
            {/* <!-- =================Content1============--> */}
            {data.map((item, index) => {
              return <CardMovie data={item} key={index} />;
            })}
            {/* <!-- akhir Content1======================= --> */}
            {/* <!-- ===============Content2============== --> */}
            <Container fluid className={styles.content2}>
              <Container className={styles.container}>
                <Row className={styles.row}>
                  <Row className={styles.dateficker}>
                    <div className={styles.datePlace}>
                      <h1>Showtimes and Tickets</h1>
                      <div className={styles.boxShowTimeTicket}>
                        <div className={styles.formLeft}>
                          <Form.Control
                            type="date"
                            name="showDate"
                            placeholder="dd-mm-yyyy"
                            min="2021-01-01"
                            max="2021-12-31"
                            value={this.state.showDate}
                            onChange={(e) => this.handleSearchByDate(e, "")}
                            className={styles.placeholder}
                          />
                        </div>
                        <Form.Group className={styles.form}>
                          <Dropdown className={styles.selectMovie}>
                            <Dropdown.Toggle
                              variant="fff"
                              className={styles.dropdownSelectMovie}
                            >
                              {setLocation}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className={styles.menuListMovie}>
                              <Dropdown.Item
                                className={styles.listMovie}
                                onClick={() =>
                                  this.handleSearchByDate(
                                    showDate,
                                    "All Location"
                                  )
                                }
                              >
                                All Location
                              </Dropdown.Item>
                              <Dropdown.Item
                                className={styles.listMovie}
                                onClick={() =>
                                  this.handleSearchByDate(
                                    showDate,
                                    "Banjarmasin"
                                  )
                                }
                              >
                                Banjarmasin
                              </Dropdown.Item>
                              <Dropdown.Item
                                className={styles.listMovie}
                                onClick={() =>
                                  this.handleSearchByDate(
                                    showDate,
                                    "Banjarbaru"
                                  )
                                }
                              >
                                Banjarbaru
                              </Dropdown.Item>
                              <Dropdown.Item
                                className={styles.listMovie}
                                onClick={() =>
                                  this.handleSearchByDate(
                                    showDate,
                                    "Barito Kuala"
                                  )
                                }
                              >
                                Barito Kuala
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </Form.Group>
                      </div>
                    </div>
                  </Row>
                  {dataPremiere.length > 0 ? (
                    <Row>
                      <Container fluid className={styles.containerFluid}>
                        <Container>
                          <Row className={styles.row2}>
                            {dataPremiere.map((item, index) => {
                              return (
                                <Bioskop
                                  dataPremiere={item}
                                  data={data[0]}
                                  key={index}
                                  length={index}
                                  handleChoose={this.handleChoose.bind(this)}
                                  oldItem={this.state.oldItem}
                                />
                              );
                            })}
                            <Container
                              className={`${styles.content21}  d-flex justify-content-between`}
                            >
                              <ReactPaginate
                                previousLabel={"prev"}
                                nextLabel={"next"}
                                breakLabel={"..."}
                                breakClassName={"break-me"}
                                pageCount={this.state.totalPage}
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
                  ) : (
                    <div className={styles.notFound}>
                      Sorry, <br /> Showtimes and tickets for today not found...
                    </div>
                  )}
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

const mapStateToProps = (state) => ({
  movie: state.movie,
  auth: state.auth,
  premiere: state.premiere,
});

const mapDispatchToProps = {
  getMovieById,
  getAllPremiere,
  getAllPremiereSearch,
};

export default connect(mapStateToProps, mapDispatchToProps)(movieDetail);
