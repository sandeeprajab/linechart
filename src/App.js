import React from 'react';
import { Navbar } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FileUploader from './FileUploader';
import SeriesPlot from './SeriesPlot';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';

function App() {

  return (
    <React.Fragment>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#">
          FissionLabs
        </Navbar.Brand>
      </Navbar>
      <FileUploader />
      
      <Container>
        <Row className="justify-content-md-center">
          <Col>
            <SeriesPlot />
          </Col>
        </Row>
      </Container>
      <br/>
     
    </React.Fragment>
  );
}

export default App;
