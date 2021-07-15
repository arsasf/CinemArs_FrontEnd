import { Component } from "react";
import NavBar from "../../../components/CinemArs/Navbar/Navbar";
import Footer from "../../../components/CinemArs/Footer/Footer";
import styles from "../Payment/Payment.module.css";
import { getBooking, createBooking } from "../../../redux/actions/order";
import { connect } from "react-redux";
import gopay from "../../../assets/img/payment/logo-gopay.png";
import gojek from "../../../assets/img/payment/logo-gojek.png";
import bca from "../../../assets/img/payment/logo-bca.png";
import bri from "../../../assets/img/payment/logo-bri.png";
import dana from "../../../assets/img/payment/logo-dana.png";
import ovo from "../../../assets/img/payment/logo-ovo.png";
import paypal from "../../../assets/img/payment/logo-paypal.png";
import visa from "../../../assets/img/payment/logo-visa.png";

class Payment extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      seat: localStorage.getItem("booking")
        ? localStorage.getItem("booking").split(",")
        : [],
      methodPayment: "",
      loading: false,
    };
  }
  componentDidMount() {
    this.getDataBooking();
  }

  getDataBooking = () => {
    const form = {
      movieId: localStorage.getItem("movie_id"),
      premiereId: localStorage.getItem("premiere_id"),
      showTimeId: localStorage.getItem("show_time_id"),
    };
    console.log(form);
    this.props
      .getBooking(form.movieId, form.premiereId, form.showTimeId)
      .then((res) => {
        console.log(res);
        this.setState({
          ...this.state,
          data: res.value.data.data[0],
        });
      })
      .catch((err) => {
        console.log(err);
        if (err) {
          return [];
        }
      });
  };

  handleMethod = (method) => {
    this.setState({
      ...this.state,
      methodPayment: method,
    });
  };

  handlePayment = () => {
    if (this.state.methodPayment !== "") {
      this.setState({
        loading: true,
      });
      console.log(this.state.seat.length);
      const setData = {
        userId: this.props.auth.data.user_id,
        premiereId: parseInt(localStorage.getItem("premiere_id")),
        showTimeId: parseInt(localStorage.getItem("show_time_id")),
        bookingTicket: this.state.seat.length,
        bookingSeat: this.state.seat,
        bookingPaymentMethod: this.state.methodPayment,
        bookingStatus: "Received",
      };
      this.props
        .createBooking(setData)
        .then((res) => {
          console.log(res);
          localStorage.removeItem("booking");
          localStorage.removeItem("movie_id");
          localStorage.removeItem("premiere_id");
          localStorage.removeItem("show_time_id");
          window.location.href = res.value.data.data.redirectUrl;
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(setData);
    }
  };
  render() {
    console.log(this.props);
    const totalPrice =
      this.state.seat.length * parseInt(this.state.data.premiere_price);
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };
    const formatDay = (dateString) => {
      const options = { weekday: "long" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };
    const { data, seat } = this.state;
    const { user_first_name, user_last_name, user_email, user_phone_number } =
      this.props.auth.data;

    return (
      <>
        <NavBar />
        <section className={styles.paymentPage}>
          <div className={`${styles.paymentPersonalinfo} container`}>
            <div className="row">
              <div className={`${styles.paymentCombine} col-lg-8`}>
                {/* <!-- ===========Content 1============== --> */}
                <div className={`${styles.content1} container`}>
                  <div className={`${styles.titlePaymentInfo} d-gird`}>
                    <h1>Payment Info</h1>
                  </div>
                </div>
                <div className={`${styles.content1} container`}>
                  <div className={styles.paymentInfo}>
                    <div
                      className={`${styles.dateMovie} d-flex justify-content-between`}
                    >
                      <h5>Date & time</h5>
                      <h6>
                        {formatDay(data.show_time_date)},{" "}
                        {formatDate(data.show_time_date)} at
                        {data.show_time_clock}
                      </h6>
                    </div>
                    <span></span>
                    <div
                      className={`${styles.titleMovie} d-flex justify-content-between`}
                    >
                      <h5>Movie title</h5>
                      <h6>{data.movie_name}</h6>
                    </div>
                    <span></span>
                    <div
                      className={`${styles.nameCinema} d-flex justify-content-between`}
                    >
                      <h5>Cinema name</h5>
                      <h6>{data.premiere_name} Cinema</h6>
                    </div>
                    <span></span>
                    <div
                      className={`${styles.priceTicket} d-flex justify-content-between`}
                    >
                      <h5>Number of tickets</h5>
                      <h6>{seat.length} pieces</h6>
                    </div>
                    <span></span>
                    <div
                      className={`${styles.totalPayment} d-flex justify-content-between`}
                    >
                      <h5>Total Payment</h5>
                      <h6>${totalPrice}</h6>
                    </div>
                  </div>
                </div>
                <div className={`${styles.content1} container`}>
                  <div className={`${styles.methodPayment} d-gird`}>
                    <h1>Choose a Payment Method</h1>
                  </div>
                </div>
                {/* <!-- Akhir Content1======================= --> */}
                {/* <!-- =================Content 2=========== --> */}
                <div className={`${styles.content2} container`}>
                  <div className={`${styles.boxPayment} container`}>
                    <div
                      className={`${styles.rowLogo1} d-flex justify-content-around`}
                    >
                      <button
                        type="button"
                        className={`${styles.button} btn`}
                        onClick={() => this.handleMethod("Google Play Store")}
                      >
                        <img src={gopay} alt="" />
                      </button>
                      <button
                        type="button"
                        className={`${styles.button} btn`}
                        onClick={() => this.handleMethod("Visa")}
                      >
                        <img src={visa} alt="" />
                      </button>
                      <button
                        type="button"
                        className={`${styles.button} btn`}
                        onClick={() => this.handleMethod("Google Play")}
                      >
                        <img src={gojek} alt="" />
                      </button>
                      <button
                        type="button"
                        className={`${styles.button} btn`}
                        onClick={() => this.handleMethod("PayPal")}
                      >
                        <img src={paypal} alt="" />
                      </button>
                    </div>
                    <div
                      className={`${styles.rowLogo1} d-flex justify-content-around mb-3`}
                    >
                      <button
                        type="button"
                        className={`${styles.button} btn`}
                        onClick={() => this.handleMethod("Dana")}
                      >
                        <img src={dana} alt="" />
                      </button>
                      <button
                        type="button"
                        className={`${styles.button} btn`}
                        onClick={() => this.handleMethod("Bank BCA")}
                      >
                        <img src={bca} alt="" />
                      </button>
                      <button
                        type="button"
                        className={`${styles.button} btn`}
                        onClick={() => this.handleMethod("Bank BRI")}
                      >
                        <img src={bri} alt="" />
                      </button>
                      <button
                        type="button"
                        className={`${styles.button} btn`}
                        onClick={() => this.handleMethod("OVO")}
                      >
                        <img src={ovo} alt="" />
                      </button>
                    </div>
                    <div
                      className={`${styles.lineOr} d-flex justify-content-around`}
                    >
                      <span></span>
                      <h6>or</h6>
                      <span></span>
                    </div>
                    <div
                      className={`${styles.cashChoosed} d-flex justify-content-center`}
                    >
                      <h1>Pay via cash.</h1>
                      <h6>See how it work</h6>
                    </div>
                  </div>
                </div>

                {/* <!-- Akhir Content2 ========--> */}

                {/* <!-- ========Content 3==================--> */}
                <div className={`${styles.content3} container`}>
                  <div
                    className={`${styles.checkout} d-flex justify-content-between`}
                  >
                    <button
                      type="button"
                      className={`${styles.btnChange1} btn`}
                      onClick={() => this.props.history.push("cinemars/order")}
                    >
                      Prvious step
                    </button>
                    <button
                      type="button"
                      className={`${styles.btnCheckout} btn shadow`}
                      onClick={() => this.handlePayment()}
                    >
                      {this.state.methodPayment !== ""
                        ? this.state.loading === true
                          ? "Waiting process..."
                          : "Pay your order"
                        : "Choose method payment"}
                    </button>
                  </div>
                </div>
              </div>
              {/* <!-- Akhir Content3================= --> */}
              {/* <!-- Akhir section ================= --> */}

              {/* <!-- =====================Content4 aside================== --> */}
              <div className={`${styles.personalinfo} col-lg-4`}>
                <div className="container">
                  <div className={`${styles.content1} container`}>
                    <div className={`${styles.infoOrder}`}>
                      <h1>Order Info</h1>
                    </div>
                  </div>
                  <div className={`${styles.personalInfoContent2} container`}>
                    <div className={styles.formInfoOrder}>
                      <form>
                        <div className="mb-3">
                          <label for="input-name" className="form-text">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={`${user_first_name} ${user_last_name}`}
                            placeholder="Full name"
                            className={`${styles.desc} form-control`}
                          />
                        </div>
                        <div className="mb-3">
                          <label for="input-email" className="form-text">
                            Email
                          </label>
                          <input
                            type="email"
                            value={user_email}
                            placeholder="Email"
                            className={`${styles.desc} form-control`}
                          />
                        </div>
                        <div className="mb-3">
                          <label for="input-phonenumber" className="form-text">
                            Phone Number
                          </label>
                          <div className="input-group">
                            <div className="input-group-text bg-light">+62</div>
                            <input
                              type="tel"
                              value={user_phone_number}
                              className="form-control"
                              id="autoSizingInputGroup"
                              placeholder="Phone number"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Akhir Content4 aside=================== --> */}
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  movie: state.movie,
  auth: state.auth,
  premiere: state.premiere,
  order: state.order,
});

const mapDispatchToProps = { getBooking, createBooking };

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
