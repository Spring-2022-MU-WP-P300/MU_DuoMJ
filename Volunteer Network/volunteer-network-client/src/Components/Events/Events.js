import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row } from "react-bootstrap";
import Event from "../Event/Event";
import SearchBar from "../SearchBar/SearchBar";
import HeroTitle from "../StyledComponents/HeroTitle";
const Events = () => {
  const [events, setEvents] = useState([]);
  const [displayEvents, setDisplayEvents] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  const handleSearch = (e) => {
    setSearchedText(e.target.value);
    const matchedEvents = events.filter((event) =>
      event.name.toLowerCase().includes(searchedText.toLowerCase())
    );
    setDisplayEvents(matchedEvents);
  };
  useEffect(() => {
    axios.get("http://localhost:5000/events").then((res) => {
      setEvents(res.data);
      setDisplayEvents(res.data);
    });
  }, []);

  return (
    <div className="d-flex flex-column">
      <div className="my-5">
        <HeroTitle>I GROW BY HELPING PEOPLE IN NEED</HeroTitle>
        <SearchBar handleSearch={handleSearch} />
      </div>
      <div>
        {events.length ? (
          <Container className="my-5">
            <Row className="g-4">
              {searchedText ? (
                displayEvents.length ? (
                  displayEvents?.map((event) => (
                    <Event event={event} key={event._id} />
                  ))
                ) : (
                  <h3 className="text-center">
                    No Results Found For{" "}
                    {searchedText.length <= 25
                      ? searchedText
                      : searchedText.slice(0, 25) + "..."}
                  </h3>
                )
              ) : (
                events?.map((event) => <Event event={event} key={event._id} />)
              )}
            </Row>
          </Container>
        ) : (
          <h2 className="text-muted text-center">Loading...</h2>
        )}
      </div>
    </div>
  );
};

export default Events;
