import React, { useState } from "react";
import { Modal, Button, Form, Row, Spinner, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ImageUploader from "react-images-upload";
import Swal from "sweetalert2";
import axios from "axios";
import useFirebase from "../../hooks/useFirebase";
const UpdateEvent = ({ show, handleClose, event, setEvent }) => {
  const { register, handleSubmit, reset } = useForm();
  const { uploadImage } = useFirebase();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [picture, setPicture] = useState("");
  const [showPic, setShowPic] = useState("");
  const onDrop = (pictureFiles, pictureDataURLs) => {
    setPicture(pictureFiles[0]);
    setShowPic(pictureDataURLs[0]);
  };
  const onSubmit = (data) => {
    setLoading(true);
    if (picture) {
      uploadImage(picture);
      data.image = `https://firebasestorage.googleapis.com/v0/b/volunteer-network-1-41cc2.appspot.com/o/images%2F${picture.name}?alt=media`;
    } else {
      data.image = event.image;
    }
    axios
      .patch(`http://localhost:5000/events/${event._id}`, data)
      .then(() => {
        setEvent(data);
        Swal.fire("Success!", "Event updated successfully!", "success").then(
          () => {
            handleClose();
          }
        );
      })
      .catch((err) => {
        setError(err.message);
      });
    reset();
    setLoading(false);
  };
  error &&
    Swal.fire({
      icon: "error",
      title: "Something went wrong!",
      text: `${error}`,
    });
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <small className="fw-bold fs-6">Old Title</small> <br /> {event.name}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Row xs={1}>
            <Col>
              <div className="mx-auto mb-3">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">New Title</Form.Label>
                  <Form.Control
                    {...register("name")}
                    required
                    type="text"
                    placeholder="Enter event"
                  />
                </Form.Group>
              </div>
            </Col>
            <Col>
              <div className="mx-auto">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">New Banner</Form.Label>
                  <div>
                    {picture && (
                      <img className="w-25" src={showPic} alt="bannerImage" />
                    )}
                    <ImageUploader
                      withIcon
                      onChange={onDrop}
                      singleImage
                      imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                      maxFileSize={5242880}
                    />
                  </div>
                </Form.Group>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="shadow-none"
            onClick={handleClose}
          >
            Close
          </Button>
          {loading ? (
            <Button
              style={{ width: "20%" }}
              variant="primary"
              className="d-block shadow-none"
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
            <Button
              style={{ width: "20%" }}
              className="d-block shadow-none"
              variant="primary"
              type="submit"
            >
              Update
            </Button>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdateEvent;
