import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../Loader/Loader";
import UpdateEvent from "../UpdateEvent/UpdateEvent";

const ManageEvents = () => {
  const [show, setShow] = useState(false);
  const [event, setEvent] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    axios
      .get(`http://localhost:5000/events/${id}`)
      .then((res) => setEvent(res.data))
      .then(() => setShow(true));
  };
  const [events, setEvents] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/events").then((res) => {
      setEvents(res.data);
    });
  }, [event]);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you wanna delete it?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/events/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire("Deleted!", "The event has been deleted.", "success");
            setEvents(events.filter((event) => event._id !== id));
          }
        });
      }
    });
  };
  return (
    <React.Fragment>
      {events?.length ? (
        <Container className="my-5">
          <Row xs={1} sm={2} md={2} className="g-4">
            {events?.map((singleEvent) => {
              const { _id, name, image } = singleEvent;
              return (
                <Col key={_id}>
                  <div
                    style={{ borderRadius: "13px" }}
                    className="d-flex bg-white p-3 justify-content-start h-100"
                  >
                    <div className="me-5 w-25">
                      <img
                        className="img-fluid "
                        loading="lazy"
                        src={image}
                        alt={name}
                      />
                    </div>
                    <div>
                      <h4>{name}</h4>
                    </div>
                    <div className="d-flex align-items-center ms-auto mt-auto">
                      <Button
                        onClick={() => handleShow(_id)}
                        className="shadow-none ms-auto me-2"
                        variant="dark"
                      >
                        Update
                      </Button>
                      <Button
                        onClick={() => handleDelete(_id)}
                        className="shadow-none ms-auto "
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      ) : (
        <Loader />
      )}
      <UpdateEvent
        show={show}
        handleClose={handleClose}
        event={event}
        setEvent={setEvent}
      />
    </React.Fragment>
  );
};

export default ManageEvents;
