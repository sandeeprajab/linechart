import React from 'react';
import { Navbar } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FileUploader from './FileUploader';

function App() {

  return (
    <React.Fragment>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#">
          <img
            src="FissionLabs.jpg"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="FissionLabs"
          />
        </Navbar.Brand>
      </Navbar>
      <br />
      <FileUploader />

    </React.Fragment>
  );
}

export default App;
