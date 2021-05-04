import { Component } from "react";
// import { Link } from "react-router-dom";
import NavBar from "../../../components/CinemArs/Navbar/Navbar";
import Footer from "../../../components/CinemArs/Footer/Footer";
// import styles from "./Payment.modules.css"

class Payment extends Component {
  render() {
    return (
      <>
        <NavBar />
        <section class="payment-page">
          <div class="payment-personalinfo container">
            <div class="row">
              <div class="payment-combine col-lg-8">
                {/* <!-- ===========Content 1============== --> */}
                <div class="content1 container">
                  <div class="title-payment-info d-gird">
                    <h1>Payment Info</h1>
                  </div>
                </div>
                <div class="content1 container">
                  <div class="payment-info">
                    <div class="date-movie d-flex justify-content-between">
                      <h5>Date & time</h5>
                      <h6>Tuesday, 07 July 2020 at 02:00pm</h6>
                    </div>
                    <span></span>
                    <div class="title-movie d-flex justify-content-between">
                      <h5>Movie title</h5>
                      <h6>Spider-Man: Homecoming</h6>
                    </div>
                    <span></span>
                    <div class="name-Cinema d-flex justify-content-between">
                      <h5>Cinema name</h5>
                      <h6>CineOne21 Cinema</h6>
                    </div>
                    <span></span>
                    <div class="price-ticket d-flex justify-content-between">
                      <h5>Number of tickets</h5>
                      <h6>3 pieces</h6>
                    </div>
                    <span></span>
                    <div class="total-payment d-flex justify-content-between">
                      <h5>Total Payment</h5>
                      <h6>$30</h6>
                    </div>
                  </div>
                </div>
                <div class="content1 container">
                  <div class="method-payment d-gird">
                    <h1>Choose a Payment Method</h1>
                  </div>
                </div>
                {/* <!-- Akhir Content1======================= --> */}
                {/* <!-- =================Content 2=========== --> */}
                <div class="content2 container">
                  <div class="container">
                    <div class="row-logo1 d-flex justify-content-around">
                      <button type="button" class="btn">
                        <img
                          src="/img/[V1] - Payment Page/logo-gopay.png"
                          alt=""
                        />
                      </button>
                      <button type="button" class="btn">
                        <img
                          src="/img/[V1] - Payment Page/logo-visa.png"
                          alt=""
                        />
                      </button>
                      <button type="button" class="btn">
                        <img
                          src="/img/[V1] - Payment Page/logo-gojek.png"
                          alt=""
                        />
                      </button>
                      <button type="button" class="btn">
                        <img
                          src="/img/[V1] - Payment Page/logo-paypal.png"
                          alt=""
                        />
                      </button>
                    </div>
                    <div class="row-logo1 d-flex justify-content-around">
                      <button type="button" class="btn">
                        <img
                          src="/img/[V1] - Payment Page/logo-dana.png"
                          alt=""
                        />
                      </button>
                      <button type="button" class="btn">
                        <img src="" alt="" />
                      </button>
                      <button type="button" class="btn">
                        <img
                          src="/img/[V1] - Payment Page/logo-bri.png"
                          alt=""
                        />
                      </button>
                      <button type="button" class="btn">
                        <img
                          src="/img/[V1] - Payment Page/logo-ovo.png"
                          alt=""
                        />
                      </button>
                    </div>
                    <div class="line-or d-flex justify-content-around">
                      <span></span>
                      <h6>or</h6>
                      <span></span>
                    </div>
                    <div class="cash-choosed d-flex justify-content-center">
                      <h1>Pay via cash.</h1>
                      <h6>See how it work</h6>
                    </div>
                  </div>
                </div>

                {/* <!-- Akhir Content2 ========--> */}

                {/* <!-- ========Content 3==================--> */}
                <div class="content3 container">
                  <div class="checkout d-flex justify-content-between">
                    <button type="button" class="btn-change1 btn">
                      Prvious step
                    </button>
                    <button type="button" class="btn-checkout btn shadow">
                      Pay your order
                    </button>
                  </div>
                </div>
              </div>
              {/* <!-- Akhir Content3================= --> */}
              {/* <!-- Akhir section ================= --> */}

              {/* <!-- =====================Content4 aside================== --> */}
              <div class="personalinfo col-lg-4">
                <div class="container">
                  <div class="content1 container">
                    <div class="info-order">
                      <h1>Order Info</h1>
                    </div>
                  </div>
                  <div class="personalinfo-content2 container">
                    <div class="form-info-order">
                      <form>
                        <div class="mb-3">
                          <label for="input-name" class="form-text">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value="Jonas El Rodriguez"
                            placeholder="Full name"
                            class="desc form-control"
                          />
                        </div>
                        <div class="mb-3">
                          <label for="input-email" class="form-text">
                            Email
                          </label>
                          <input
                            type="email"
                            value="jonasrodri123@gmail.com"
                            placeholder="Email"
                            class="desc form-control"
                          />
                        </div>
                        <div class="mb-3">
                          <label for="input-phonenumber" class="form-text">
                            Phone Number
                          </label>
                          <div class="input-group">
                            <div class="input-group-text bg-light">+62</div>
                            <input
                              type="tel"
                              value="81445687121"
                              class="form-control"
                              id="autoSizingInputGroup"
                              placeholder="Phone number"
                            />
                          </div>
                        </div>
                        <div class="warning mt-5">
                          <div class="d-flex justify-content-around">
                            <div class="">
                              <img
                                src="/img/[V1] - Payment Page/icon-warning.png"
                                alt=""
                              />
                            </div>
                            <div class="">
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
