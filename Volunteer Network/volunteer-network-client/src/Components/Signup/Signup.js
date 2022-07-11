import React, { useRef, useState } from "react";
import { Card, Button, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { AuthContainer } from "../StyledComponents/Auth";
import SocialMediaIcon from "../StyledComponents/SocialMediaIcon";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

const Signup = () => {
  const location = useLocation();
  const redirectURL = location.state?.from || "/";
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const navigate = useNavigate();
  const { handleSignup, handleGoogleSignIn, handleGithubSignIn } = useAuth();
  const [signupError, setSignupError] = useState("");
  const [loading, setLoading] = useState(false);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setSignupError("Password do not match");
    } else if (passwordRef.current.value.length < 6) {
      return setSignupError("password must be 6 characters long");
    }
    try {
      setSignupError("");
      setLoading(true);
      await handleSignup(
        emailRef.current.value,
        passwordRef.current.value,
        nameRef.current.value
      );
      setSignupError("");
      navigate(redirectURL);
    } catch (error) {
      setSignupError(error.message);
    }
    setLoading(false);
  };
  signupError &&
    Swal.fire({
      icon: "error",
      title: "Something went wrong!",
      text: `${signupError}`,
    });
  return (
    <React.Fragment>
      <ScrollToTop />
      <AuthContainer>
        <section className="w-100" style={{ maxWidth: "450px" }}>
          <Card className=" border-secondary">
            <Card.Body>
              <h2 className="text-center mb-4">Create account</h2>
              <div className="social-container text-center my-3">
                <SocialMediaIcon
                  onClick={() =>
                    handleGoogleSignIn()
                      .then(() => {
                        navigate(redirectURL);
                      })
                      .catch((error) => {
                        setSignupError(error.message);
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
                        setSignupError(error.message);
                      })
                  }
                  className="fab fa-github"
                ></SocialMediaIcon>
              </div>
              <p className="text-center my-3">
                or use your email for registration
              </p>

              <Form onSubmit={handleSubmit}>
                <Form.Group id="name">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    ref={nameRef}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
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
                <Form.Group id="password-confirm">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    ref={passwordConfirmRef}
                  ></Form.Control>
                </Form.Group>
                {loading ? (
                  <Button
                    disabled
                    variant="primary"
                    className="w-100 my-4 shadow-none"
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
                    Sign up
                  </Button>
                )}
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </section>
      </AuthContainer>
    </React.Fragment>
  );
};

export default Signup;
