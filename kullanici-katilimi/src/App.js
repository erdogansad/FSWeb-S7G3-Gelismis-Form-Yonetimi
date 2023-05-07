import React, { useState } from 'react'
import axios from "axios";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import FormPage from "./FormPage"


const App = () => {
  const [data, setData] = useState([]),
        [respData, setRespData] = useState();

  const formSubmit = (e, userData, cb) => {
    e.preventDefault();
    axios.post("https://reqres.in/api/users", {...userData})
    .then(resp => {
      setRespData(resp);
      cb(true);
    })
    setData([...data, userData]);
  }

  return (
    <Container className='vh-100'>
      <Row className='pt-5'>
        <Col>
          <FormPage formSubmit={formSubmit}/>
        </Col>
      </Row>
      <Row className='p-5'>
        <Col xs="6" className='mx-auto text-center'>
          <ListGroup>
            {
              data !== [] && data.map((user, i) => <ListGroupItem key={i}> {user.fname} {user.lname} ({user.email}) </ListGroupItem>)
            }
          </ListGroup>
        </Col>
        <Col className='pt-2' xs="12">
          <pre>
            {respData && JSON.stringify(respData,null,2)}
          </pre>
        </Col>
      </Row>
    </Container>
  )
}

export default App