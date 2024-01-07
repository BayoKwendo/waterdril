/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Form } from 'react-bootstrap';
import { Button } from 'reactstrap';
import { MDBCloseIcon } from "mdbreact"
import { baseURL, CONFIG, errorToast, successToast, ToastTable } from '../../../configs/exports';
import axios from 'axios';
import img from '../../../_assets/img/logo.png'
// import Select from 'react-select';
import Alert from '../../../shared/components/Alert';

import './style2.css';

const LogIn = () => {

  // initialing hooks
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [username, setUsername] = React.useState('');


  const [full_name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password_again, setPasswordAgain] = React.useState('');


  const [password, setPassword] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [statusMessage, setStatusMessage] = React.useState('');
  const [openPassword, isOpenPassword] = React.useState(false);
  const [loading, isLoading] = React.useState('');
  const [loggedin, isLoggedIn] = React.useState(localStorage.getItem("isLoggedIn") ? true : false);
  // toggle password visibility



  useEffect(() => {

    // check if user was logged in
    if (loggedin) {
      // window.location.href = "dashboard";
    }
  }, [loggedin]);


  const handleChangeUsername = event => {
    setUsername(event.target.value);
  };

  const handleChangePassword = event => {
    setPassword(event.target.value);
  };


  const showPasswordToggle = () => {
    // eslint-disable-next-line
    if (showPassword == true) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };


  //submit function
  const onSubmit = e => {
    e.preventDefault();
    isLoading(true);
    if (username === "" || password === "") {
      setStatusMessage("")
      setError(true)
      setErrorMessage("Username and password is required")
      setSuccess(false)
      isLoading(false)
    } else {
      let formData = {
        "username": username,
        "password": password,
      }
      axios.post(baseURL + 'login', formData, CONFIG).then((response) => {
        if (response.data.success) {

          localStorage.setItem("USER", response.data.user)
          localStorage.setItem("token", response.data.access_token)
          localStorage.setItem("msisdn", response.data.user.msisdn);
          isLoggedIn(true)

          successToast("Login Success! Redirecting....")

          localStorage.setItem("isLoggedIn", true);
          // // eslint-disable-next-line
          window.setTimeout(() => {
            window.location.href = "dashboard"
            isLoading(false)
            // }
          }, 10);
        }
        else {

          isLoading(false)
          errorToast(response.data.message)
          window.setTimeout(() => {
            isLoading(false)
            setError(false)
          }, 5000);
        }
      }).catch(error => {

        if (error.response.data.error) {
          errorToast(error.response.data.error)
        } else {

          errorToast(error.response.data)
        }
        isLoading(false)

      });
    }
  };

  const closeModalReset = e => {
    isOpenPassword(false);
  };

  const resetpasswordchange = e => {
    isOpenPassword(true);
  };


  // reset password functions
  const onSubmitPasswordReset = e => {
    e.preventDefault();
    isLoading(true);


    if (password_again == password) {

      let formData = {
        "username": username,
        "full_name": full_name,
        "email": email,
        "password": password
      }

      // alert(formData)

      axios.post(baseURL + 'auth/users', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {

          // console.log("testtesttsttesttest ",  )
          if (response.status == 200) {
            setStatusMessage("Success!")
            setError(false)
            setSuccess(true)
            setErrorMessage('')
            // eslint-disable-next-line
            window.setTimeout(() => {
              // alert(response.data.user.role)
              isOpenPassword(false);
              setSuccess(false)
              isLoading(false)

            }, 3000);
          }
          else {
            setStatusMessage("")
            setError(true)
            errorToast("Error")
            setSuccess(false)
            window.setTimeout(() => {
              // alert(response.data.user.role)
              isLoading(false)
              setError(false)
            }, 5000);
          }
        }).catch(error => {
          setError(true)
          if (error.response.data.error) {
            errorToast(error.response.data.error)
          } else {

            errorToast(error.response.data)
          }
          isLoading(false)
          setSuccess(false)
        });
    } else {
      isLoading(false);

      errorToast("Password Don't Match")

    }
  }


  // return the UI
  return (
    <div className="elite-login">

      <ToastTable />

      <Modal
        isOpen={openPassword}
        onRequestClose={e => {
          closeModalReset(e);
        }}
        contentLabel="My dialog"
        className="mymodal"
        onAfterOpen={() => {
          document.body.style.overflow = 'hidden';
        }}
        onAfterClose={() => {
          document.body.removeAttribute('style');
        }}
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <MDBCloseIcon onClick={closeModalReset} />
        <h4><b>Create User</b></h4>
        <>
          <Form className="form login-form col-8 offset-2" onSubmit={onSubmitPasswordReset}>
            {/*n  <h5><b>Get Agent Number</b></h5> */}
            <div className="form__form-group">
              <br></br>
              {success ? (
                <Alert color="success" className="alert--colored" >
                  <span>
                    {statusMessage}
                  </span>
                </Alert>
              ) : null}
              {error && (
                <div>
                  <div
                    color="red"
                    style={{ fontSize: "13px", color: "red" }}>
                    {errorMessage}
                  </div>
                </div>
              )}
              <span className="form__form-group-label">Username</span>
              <div className="form__form-group-field">
                <Form.Control
                  autoFocus
                  type="text"
                  name="username"
                  style={{ color: "black", borderColor: "hsl(0,0%,80%)" }}
                  placeholder="Enter your Username"
                  className="input-without-border-radius"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
              <br />

              <span className="form__form-group-label">Full Name</span>
              <div className="form__form-group-field">
                <Form.Control
                  autoFocus
                  type="text"
                  name="full_name"
                  style={{ color: "black", borderColor: "hsl(0,0%,80%)" }}
                  placeholder="Enter your Name"
                  className="input-without-border-radius"
                  value={full_name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <br />


              <span className="form__form-group-label">Email</span>
              <div className="form__form-group-field">
                <Form.Control
                  autoFocus
                  type="email"
                  name="email"
                  style={{ color: "black", borderColor: "hsl(0,0%,80%)" }}
                  placeholder="Enter your Email"
                  className="input-without-border-radius"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <br />


              <span className="form__form-group-label">Password</span>
              <div className="form__form-group-field">
                <Form.Control
                  autoFocus
                  type="password"
                  name="password"
                  style={{ color: "black", borderColor: "hsl(0,0%,80%)" }}
                  placeholder="Enter your Password"
                  className="input-without-border-radius"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <br />

              <span className="form__form-group-label">Password Again</span>
              <div className="form__form-group-field">
                <Form.Control
                  autoFocus
                  type="password"
                  name="password_again"
                  style={{ color: "black", borderColor: "hsl(0,0%,80%)" }}
                  placeholder="Enter your Password Again"
                  className="input-without-border-radius"
                  value={password_again}
                  onChange={e => setPasswordAgain(e.target.value)}
                />
              </div>
              <br />
            </div>
            <div className="account__btns col-8 offset-2">
              <Button className="account__btn" type='submit' color="success"> {
                loading ? "Please wait..." : "Create"
              }</Button>
            </div>

          </Form>
        </>
      </Modal>




      <div className="elite-login-sec">
        <div className="row">
          <div className="col-md-6 elite-login-left">
            <div className="carousel-wrap center">
              <div className="item">
                <div className="item-sec center">
                  <div className="login_slider_image center">
                    <img className='center' src={img} alt="logo" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 elite-login-right">
            <h1 className="elite-login-head">SMART DRILLING</h1>
            <form className="elite-login-form" onSubmit={onSubmit} >

              <div className="elite-form-field">
                <label htmlFor="user_email">Your username (2547***)</label>
                <input className="form-control"
                  placeholder="Enter Username (2547)"
                  id="elite-username"
                  required="required"
                  type="text"
                  onChange={handleChangeUsername}
                  style={{ borderColor: "grey" }}
                  value={username}
                  name="username" />
              </div>
              <div className="elite-form-field">
                <label htmlFor="user_email">Password</label>
                <input
                  placeholder="Enter your password"
                  id="elite-email"
                  className="form-control"
                  required="required"
                  style={{ borderColor: "grey" }}
                  value={password}
                  onChange={handleChangePassword}
                  type={showPassword === true ? "text" : "password"}
                />
                <input type="hidden" name="user_timezone" id="user_timezone" />
                <span toggle="#password-field" onClick={showPasswordToggle} className="fa fa-fw fa-eye field-icon toggle-password" />

                {// eslint-disable-next-line
                }
                <p className="elite-agent-pwd" ><a href="#" onClick={resetpasswordchange}
                  data-toggle="modal" data-target="#specialist-forgotModal">
                  Register ?

                </a></p>
                <br /><br />

                <br /><br />
                <br /><br />

              </div>


              <button type="submit" className="elite-form-btn"> {
                loading ? "Please wait..." : "Sign In"}
              </button>
              <br />
              <br />
              <p><b>Smart Drilling: </b><br />Enhances customer value-Created trust in a broken system<br />Automates orders management through algorithm-All vetted vendors</p>
            </form>
          </div>
        </div>
      </div >
    </div >
  );
}

export default connect(state => ({ theme: state.theme }))(LogIn);
