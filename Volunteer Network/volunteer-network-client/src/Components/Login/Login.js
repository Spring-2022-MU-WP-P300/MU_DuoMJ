import React, { useRef, useState } from "react";
import { Card, Form, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { AuthContainer } from "../StyledComponents/Auth";
import SocialMediaIcon from "../StyledComponents/SocialMediaIcon";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

const Login = () => {
  const location = useLocation();
  const redirectURL = location.state?.from?.pathname || "/";
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { handleSignIn, handleGoogleSignIn, handleGithubSignIn } = useAuth();
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoginError("");
      setLoading(true);
      await handleSignIn(emailRef.current.value, passwordRef.current.value);
      navigate(redirectURL);
      setLoginError("");
    } catch ({ message }) {
      setLoginError(message);
    }
    setLoading(false);
  };

  loginError &&
    Swal.fire({
      icon: "error",
      title: "Something went wrong!",
      text: `${loginError}`,
    });

  return (
    <React.Fragment>
      <ScrollToTop />
      <AuthContainer>
        <section className="w-100" style={{ maxWidth: "400px" }}>
          <Card className=" border-secondary">
            <Card.Body>
              <h2 className="text-center mb-4">Log in</h2>
              <div className="social-container text-center my-3">
                <SocialMediaIcon
                  onClick={() =>
                    handleGoogleSignIn()
                      .then(() => {
                        navigate(redirectURL);
                      })
                      .catch((error) => {
                        console.log(error);
                        setLoginError(error.message);
                      })
                  }
                  className="fab fa-google-plus-g"
                ></SocialMediaIcon>
                <SocialMediaIcon
                  onClick={() =>
                    handleGithubSignIn()
                      .then(() => {
                        navigate(redirectURL);
                      })
                      .catch((error) => {
                        setLoginError(error.message);
                      })
                  }
                  className="fab fa-github"
                ></SocialMediaIcon>
              </div>
              <p className="text-center my-3">or use your email for login</p>
              <p className="text-center"></p>
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email "
                    required
                    ref={emailRef}
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    ref={passwordRef}
                  ></Form.Control>
                </Form.Group>
                {loading ? (
                  <Button
                    variant="primary"
                    className="w-100 my-4 shadow-none"
                    disabled
                  >
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="visually-hidden">Loading...</span>
                  </Button>
                ) : (
                  <Button type="submit" className="w-100 my-4 shadow-none">
                    Login
                  </Button>
                )}
              </Form>
              <div className="w-100 text-center mt-2">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Need an account?
            <Link
              to={{
                pathname: "/signup",
                state: { from: redirectURL },
              }}
            >
              Sign up
            </Link>
          </div>
        </section>
      </AuthContainer>
    </React.Fragment>
  );
};

export default Login;
