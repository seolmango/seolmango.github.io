import React from "react";
import {Container} from "react-bootstrap";
import {Navbar} from "react-bootstrap";
import zerotoing from "../assets/zerotoing.png";
import "./Navbar.css";

const MyNavbar = (props) => {
    return (
      <div>
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/" className="title">
                    <img
                        alt="logo"
                        src={zerotoing}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    <b>Seolmango</b>
                </Navbar.Brand>
            </Container>
        </Navbar>
      </div>
    );
}

export default MyNavbar;