import { Component } from "react";
// import { Link } from "react-router-dom";
import NavBar from "../../../components/CinemArs/Navbar/Navbar";
import Footer from "../../../components/CinemArs/Footer/Footer";
import styles from "../Payment/Payment.module.css";

class Payment extends Component {
  render() {
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
                      <h6>Tuesday, 07 July 2020 at 02:00pm</h6>
                    </div>
                    <span></span>
                    <div
                      className={`${styles.titleMovie} d-flex justify-content-between`}
                    >
                      <h5>Movie title</h5>
                      <h6>Spider-Man: Homecoming</h6>
                    </div>
                    <span></span>
                    <div
                      className={`${styles.nameCinema} d-flex justify-content-between`}
                    >
                      <h5>Cinema name</h5>
                      <h6>CineOne21 Cinema</h6>
                    </div>
                    <span></span>
                    <div
                      className={`${styles.priceTicket} d-flex justify-content-between`}
                    >
                      <h5>Number of tickets</h5>
                      <h6>3 pieces</h6>
                    </div>
                    <span></span>
                    <div
                      className={`${styles.totalPayment} d-flex justify-content-between`}
                    >
                      <h5>Total Payment</h5>
                      <h6>$30</h6>
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
                  <div className="container">
                    <div
                      className={`${styles.rowLogo1} d-flex justify-content-around`}
                    >
                      <button type="button" className={`${styles.btn} btn`}>
                        <img
                          src="/img/[V1] - Payment Page/logo-gopay.png"
                          alt=""
                        />
                      </button>
                      <button type="button" className={`${styles.btn} btn`}>
                        <img
                          src="/img/[V1] - Payment Page/logo-visa.png"
                          alt=""
                        />
                      </button>
                      <button type="button" className={`${styles.btn} btn`}>
                        <img
                          src="/img/[V1] - Payment Page/logo-gojek.png"
                          alt=""
                        />
                      </button>
                      <button type="button" className={`${styles.btn} btn`}>
                        <img
                          src="/img/[V1] - Payment Page/logo-paypal.png"
                          alt=""
                        />
                      </button>
                    </div>
                    <div className="row-logo1 d-flex justify-content-around">
                      <button type="button" className={`${styles.btn} btn`}>
                        <img
                          src="/img/[V1] - Payment Page/logo-dana.png"
                          alt=""
                        />
                      </button>
                      <button type="button" className={`${styles.btn} btn`}>
                        <img src="" alt="" />
                      </button>
                      <button type="button" className={`${styles.btn} btn`}>
                        <img
                          src="/img/[V1] - Payment Page/logo-bri.png"
                          alt=""
                        />
                      </button>
                      <button type="button" className={`${styles.btn} btn`}>
                        <img
                          src="/img/[V1] - Payment Page/logo-ovo.png"
                          alt=""
                        />
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
                    >
                      Prvious step
                    </button>
                    <button
                      type="button"
                      className={`${styles.btnCheckout} btn shadow`}
                    >
                      Pay your order
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
                            value="Jonas El Rodriguez"
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
                            value="jonasrodri123@gmail.com"
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
                              value="81445687121"
                              className="form-control"
                              id="autoSizingInputGroup"
                              placeholder="Phone number"
                            />
                          </div>
                        </div>
                        <div className={`${styles.warning} mt-5`}>
                          <div className="d-flex justify-content-around">
                            <div className="">
                              <img
                                src="/img/[V1] - Payment Page/icon-warning.png"
                                alt=""
                              />
                            </div>
                            <div className="">
                              <h6>Fill your data corecctly</h6>
                            </div>
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

export default Payment;
