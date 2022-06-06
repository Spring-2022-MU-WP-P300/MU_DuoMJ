import React from "react";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router";
import { EventImage, EventTitleDiv } from "../StyledComponents/Event";
import loadingImage from "../../images/loading.png";

const Event = ({ event: { name, image, _id } }) => {
  const navigate = useNavigate();
  const handleEventClick = () => {
    navigate(`/register/${_id}`);
  };
  return (
    <Col xs={12} md={6} lg={3}>
      <div>
        <EventImage
          onClick={handleEventClick}
          src={image ? image : loadingImage}
          alt={name}
          loading="lazy"
          className="img-fluid"
        />
        <EventTitleDiv>{name}</EventTitleDiv>
      </div>
    </Col>
  );
};

export default Event;
