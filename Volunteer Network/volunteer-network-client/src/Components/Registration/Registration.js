import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import DatePicker from "react-date-picker";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import Loader from "../Loader/Loader";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import moment from "moment";
import "./Registration.css";
import Swal from "sweetalert2";
const Registration = () => {
  const navigate = useNavigate();
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [event, setEvent] = useState({});
  const [value, onChange] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  //show the dynamic event
  const { eventId } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/events/${eventId}`)
      .then((res) => setEvent(res.data));
  }, [eventId]);

  //getting all register info
  useEffect(() => {
    axios
      .get("http://localhost:5000/registeredInfo")
      .then((res) => setRegisteredEvents(res.data));
  }, []);

  const {
    currentUser: { displayName, email },
  } = useAuth();
  const onSubmit = (data) => {
    setLoading(true);
    const month = value.getUTCMonth() + 1; //months from 1-12
    const day = value.getDate();
    const year = value.getUTCFullYear();
    const date = `${month}/${day}/${year}`;
    data.date = date;
    data.event = event.name;
    data.imgURL = event.image;
    data.email = email;
    data.status = "pending";
    const exist = registeredEvents.find((event) => event.event === data.event);
    if (exist) {
      <ScrollToTop />;
      setError("You have already registered for this event");
    } else {
      axios.post("http://localhost:5000/registeredInfo", data).then((res) => {
        if (res.data.insertedId) {
          Swal.fire(
            "Good job!",
            `You have successfully registered for ${event.name} event`,
            "success"
          ).then(() => navigate("/"));
        }
      });
    }
    setLoading(false);
  };
  error &&
    Swal.fire({
      icon: "error",
      title: "Something went wrong!",
      text: `${error}`,
    });
  return (
    <React.Fragment>
      <ScrollToTop />;
      {event.name ? (
        <Form
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: "40%" }}
          className="mx-auto mb-5 border p-5"
        >
          <h4 className="mb-4">Register as a Volunteer</h4>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              {...register("name")}
              defaultValue={displayName}
              type="text"
              placeholder="Enter your name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              defaultValue={email}
              disabled
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <DatePicker
              className="form-control"
              onChange={onChange}
              value={value}
              required
              minDate={moment().toDate()}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Work</Form.Label>
            <Form.Control
              {...register("desc")}
              as="textarea"
              placeholder={`Tell us something about ${event.name} work`}
              rows={3}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Event Name</Form.Label>
            <Form.Control defaultValue={event.name} disabled type="text" />
          </Form.Group>
          {loading ? (
            <Button variant="primary" className="w-100 shadow-none" disabled>
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
            <Button
              className="w-100 shadow-none"
              variant="primary"
              type="submit"
            >
              Register
            </Button>
          )}
        </Form>
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
};

export default Registration;
