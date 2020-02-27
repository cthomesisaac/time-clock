import React from 'react';
import {
  Row,
  Col,
  Button
} from 'reactstrap';

export default function Login({ handleLogin }) {
  return (
    <Row className="justify-content-center">
      <Col md="4">
        <Button block onClick={() => handleLogin('google')}>Log In</Button>
      </Col>
    </Row>
  )
}
