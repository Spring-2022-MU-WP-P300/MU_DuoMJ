import axios from "axios";
import React, { useState, useEffect } from "react";
import { Table, Button, Badge } from "react-bootstrap";
import Swal from "sweetalert2";
import "./RegisteredEvents.css";

const RegisteredEvents = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [updated, setUpdated] = useState(false);
  //getting all registered info
  useEffect(() => {
    axios
      .get("http://localhost:5000/registeredInfo")
      .then((res) => setRegisteredEvents(res.data));
  }, [updated]);
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
        Swal.fire(
          "deleted!",
          "Successfully deleted this registration",
          "success"
        );
        axios
          .delete(`http://localhost:5000/registeredInfo/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              const remaining = registeredEvents.filter(
                (registeredEvent) => registeredEvent._id !== id
              );
              setRegisteredEvents(remaining);
            }
          });
      }
    });
  };

  const handleUpdate = (id) => {
    Swal.fire({
      title: "Are you sure you wanna update status?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(`http://localhost:5000/registeredInfo/${id}`, {
            status: "approved",
          })
          .then((res) => res.data.modifiedCount && setUpdated(id))
          .then(() =>
            Swal.fire(
              "Updated!",
              "Successfully updated registration status",
              "success"
            )
          );
      }
    });
  };

  return (
    <div className="my-5 mx-3 border p-5 admin">
      <Table responsive>
        <thead className="bg-light ">
          <tr>
            <th className="p-3 name">Name</th>
            <th className="p-3">Email Id</th>
            <th className="p-3">Date</th>
            <th className="p-3">Event</th>
            <th className="p-3">Description</th>
            <th className="p-3">Status</th>
            <th className="pb-3">Update Status</th>
            <th className="pb-3 action">Action</th>
          </tr>
        </thead>
        <tbody>
          {registeredEvents?.map((singleEvent) => {
            const { _id, name, email, date, event, status, desc } = singleEvent;
            return (
              <tr key={_id}>
                <td className="p-3">
                  <p className="mt-2">{name}</p>
                </td>
                <td className="p-3">
                  <p className="mt-2">{email}</p>
                </td>
                <td className="p-3">
                  <p className="mt-2">{date}</p>
                </td>
                <td className="p-3">
                  <p className="mt-2"> {event}</p>
                </td>
                <td className="p-3">
                  <p className="mt-2"> {desc}</p>
                </td>
                <td className="p-3">
                  <Badge
                    className="px-2 pb-2 pt-1 mt-2"
                    pill
                    bg={`${status === "pending" ? "danger" : "success"}`}
                  >
                    {status}
                  </Badge>
                </td>
                <td className="p-3">
                  <Button
                    disabled={status === "approved"}
                    onClick={() => {
                      handleUpdate(_id);
                    }}
                    variant="info"
                    className="shadow-none text-black fw-bold"
                  >
                    {status === "pending" ? "Update" : "Updated"}
                  </Button>
                </td>
                <td className="p-3">
                  <Button
                    className="shadow-none"
                    onClick={() => handleDelete(_id)}
                    variant="danger"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default RegisteredEvents;
