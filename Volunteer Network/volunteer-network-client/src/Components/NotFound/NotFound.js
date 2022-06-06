import React from "react";
import { Row, Container, Col } from "react-bootstrap";
import {
  Page404Bg,
  Page404Container,
  Page404Title,
  Page404Content,
  Page404SubTitle,
  Page404Link,
  Page404SubContainer,
} from "../StyledComponents/NotFound404";

const NotFound = () => {
  return (
    <Page404Container>
      <Container>
        <Row>
          <Col sm={12}>
            <Page404SubContainer>
              <Page404Bg>
                <Page404Title>404</Page404Title>
              </Page404Bg>

              <Page404Content>
                <Page404SubTitle>Look like you're lost</Page404SubTitle>

                <p>the page you are looking for is not available!</p>

                <Page404Link to="/">Go to Home</Page404Link>
              </Page404Content>
            </Page404SubContainer>
          </Col>
        </Row>
      </Container>
    </Page404Container>
  );
};

export default NotFound;
