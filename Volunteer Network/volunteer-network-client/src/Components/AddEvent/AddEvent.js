import axios from "axios";
import React, { useState } from "react";
import { Container, Form, Row, Button, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ImageUploader from "react-images-upload";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useFirebase from "../../hooks/useFirebase";

const AddEvent = () => {
  const navigate = useNavigate();
  const { uploadImage } = useFirebase();
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [picture, setPicture] = useState("");
  const [showPic, setShowPic] = useState("");
  const onDrop = (pictureFiles, pictureDataURLs) => {
    setPicture(pictureFiles[0]);
    setShowPic(pictureDataURLs[0]);
  };
  const onSubmit = (data) => {
    setLoading(true);
    if (!showPic) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "Image is required",
      });
    } else {
      uploadImage(picture);
      data.image = `https://firebasestorage.googleapis.com/v0/b/volunteer-network-1-41cc2.appspot.com/o/images%2F${picture.name}?alt=media`;
      axios.post("http://localhost:5000/events", data).then(() => {
        Swal.fire(
          "Good job!",
          "Successfully added a new event!",
          "success"
        ).then(() => {
          navigate("/");
        });
      });
    }
    setLoading(false);
    reset();
  };

  return (
    <Container style={{ borderRadius: "35px" }} className="p-5 bg-white my-5">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row xs={1} sm={1} md={2}>
          <div style={{ width: "45%" }} className="mx-auto">
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Event Title</Form.Label>
              <Form.Control
                {...register("name")}
                required
                type="text"
                placeholder="Enter event"
              />
            </Form.Group>
          </div>
          <div style={{ width: "45%" }} className="mx-auto">
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Banner</Form.Label>
              <div>
                {picture && (
                  <img className="w-25" src={showPic} alt="bannerImage" />
                )}
                <ImageUploader
                  withIcon
                  disabled
                  onChange={onDrop}
                  singleImage
                  buttonText="Upload Image"
                  imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                  maxFileSize={5242880}
                />
              </div>
            </Form.Group>
          </div>
        </Row>
        {loading ? (
          <Button
            style={{ width: "10%" }}
            variant="primary"
            className="ms-auto d-block shadow-none"
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
            style={{ width: "10%" }}
            className="ms-auto  d-block shadow-none"
            variant="primary"
            type="submit"
          >
            Post
          </Button>
        )}
      </Form>
    </Container>
  );
};

export default AddEvent;
