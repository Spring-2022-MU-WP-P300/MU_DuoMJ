import React, { useRef, useState } from "react";
import { Card, Form, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { AuthContainer } from "../StyledComponents/Auth";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

const ForgotPassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [forgotPasswordError, setForgotPasswordError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setForgotPasswordError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instruction");
    } catch (error) {
      setForgotPasswordError(error.message);
    }
    setLoading(false);
  };
  forgotPasswordError &&
    Swal.fire({
      icon: "error",
      title: "Something went wrong!",
      text: `${forgotPasswordError}`,
    });
  message && Swal.fire({ message });

  return (
    <React.Fragment>
      <ScrollToTop />
      <AuthContainer>
        <section className="w-100" style={{ maxWidth: "400px" }}>
          <Card className="border-secondary">
            <Card.Body>
              <h2 className="text-center mb-4">Password Reset</h2>
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
                    Reset Password
                  </Button>
                )}
              </Form>
              <div className="w-100 text-center mt-2">
                <Link to="/login">Login</Link>
              </div>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Sign up</Link>
          </div>
        </section>
      </AuthContainer>
    </React.Fragment>
  );
};

export default ForgotPassword;
