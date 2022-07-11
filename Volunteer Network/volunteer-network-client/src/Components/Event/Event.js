import React from "react";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router";
import { EventImage, EventTitleDiv } from "../StyledComponents/Event";

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
          src={
            image
              ? image
              : "https://i.ibb.co/jWRshyq/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg"
          }
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
