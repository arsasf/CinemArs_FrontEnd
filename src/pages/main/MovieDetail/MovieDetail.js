import { Component } from "react";
import { Container, Row, Form, Dropdown } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import NavBar from "../../../components/CinemArs/Navbar/Navbar";
import Footer from "../../../components/CinemArs/Footer/Footer";
import styles from "./MovieDetail.module.css";
import CardMovie from "../../../components/CinemArs/CardMovie/CardMovie";
import Bioskop from "../../../components/CinemArs/CardBioskop/Bioskop";
import { getMovieById } from "../../../redux/actions/movie";
import { getAllPremiere } from "../../../redux/actions/premiere";
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
      showDate: "2021-07-15",
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
    const { page, limit, sort, searchByLocation, searchByDate } = this.state;
    this.props
      .getAllPremiere(id, page, limit, sort, searchByLocation, searchByDate)
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

  handleSearchByDate = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
    const { id } = this.props.match.params;
    const searchByDate = `${event.target.value}`;
    console.log(searchByDate, typeof searchByDate);
    const { page, limit, sort, searchByLocation } = this.state;
    this.props
      .getAllPremiere(
        id,
        page,
        limit,
        sort,
        searchByLocation,
        event.target.value
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
  };
  render() {
    const { data, dataPremiere } = this.state;
    return (
      <>
        <NavBar />
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
                            defaultValue={this.state.showDate}
                            min="2021-01-01"
                            max="2021-12-31"
                            value={this.state.showDate}
                            onChange={(e) => this.handleSearchByDate(e)}
                            className={styles.placeholder}
                          />
                        </div>
                        <Form.Group className={styles.form}>
                          <Dropdown className={styles.selectMovie}>
                            <Dropdown.Toggle
                              variant="fff"
                              className={styles.dropdownSelectMovie}
                            >
                              Location
                            </Dropdown.Toggle>
                            <Dropdown.Menu className={styles.menuListMovie}>
                              <Dropdown.Item className={styles.listMovie}>
                                Banjarmasin
                              </Dropdown.Item>
                              <Dropdown.Item className={styles.listMovie}>
                                Banjarbaru
                              </Dropdown.Item>
                              <Dropdown.Item className={styles.listMovie}>
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
                      Sorry, <br /> Showtimes and tickets not found...
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

const mapDispatchToProps = { getMovieById, getAllPremiere };

export default connect(mapStateToProps, mapDispatchToProps)(movieDetail);
