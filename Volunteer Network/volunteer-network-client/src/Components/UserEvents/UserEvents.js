import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import Loader from "../Loader/Loader";

const UserEvents = () => {
  const navigate = useNavigate();
  const [userEvents, setUserEvents] = useState(null);
  const {
    currentUser: { email },
    token,
  } = useAuth();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/registeredInfo/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) return setUserEvents(res.data);
        else return navigate("/forbidden");
      });
  }, [email, navigate, token]);

  //confirming deletion
  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure to cancel the registration?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Cancelled!",
          "Your registration has been cancelled.",
          "success"
        );
        axios
          .delete(`http://localhost:5000/registeredInfo/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              const remaining = userEvents.filter((event) => event._id !== id);
              setUserEvents(remaining);
            }
          });
      }
    });
  };
  return (
    <React.Fragment>
      {userEvents ? (
        <Container className="my-5">
          {!userEvents?.length ? (
            <div>
              <h1 className="text-center">Not registered for any events</h1>
            </div>
          ) : (
            <Row xs={1} sm={2} md={2} className="g-4">
              {userEvents?.map((userEvent) => {
                const { _id, event, date, imgURL, status } = userEvent;
                return (
                  <div key={_id}>
                    <div
                      style={{ borderRadius: "13px" }}
                      className="d-flex bg-white p-3 justify-content-start h-100"
                    >
                      <div className="me-5 w-25">
                        <img
                          className="img-fluid "
                          loading="lazy"
                          src={imgURL}
                          alt={event}
                        />
                      </div>
                      <div>
                        <h4>{event}</h4>
                        <Badge
                          className="px-2 pb-2 pt-1 mt-2"
                          pill
                          bg={`${status === "pending" ? "danger" : "success"}`}
                        >
                          {status}
                        </Badge>
                        <p>Date: {date}</p>
                      </div>
                      <div className="d-block ms-auto mt-auto">
                        <Button
                          disabled={status === "approved"}
                          onClick={() => handleCancel(_id)}
                          className="shadow-none ms-auto "
                          variant="danger"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Row>
          )}
        </Container>
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
};

export default UserEvents;
