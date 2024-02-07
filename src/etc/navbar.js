import React from "react";
import {Container, Navbar, Nav} from "react-bootstrap";
import zerotoing from "../assets/zerotoing.webp";
import "./Navbar.css";
import {LinkContainer} from "react-router-bootstrap";

const MyNavbar = (props) => {
    return (
      <div>
        <Navbar className="bg-body-tertiary" data-bs-theme="dark">
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

                <Navbar.Collapse>
                    <Nav className="me-auto navbar-items">
                        <LinkContainer to="/">
                            <Nav.Link className={"normal"}>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/projects">
                            <Nav.Link className={"normal"}>Projects</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
      </div>
    );
}

export default MyNavbar;