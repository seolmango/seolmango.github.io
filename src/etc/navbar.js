import React from "react";
import {Container, Navbar, Nav} from "react-bootstrap";
import zerotoing from "../assets/zerotoing.png";
import "./Navbar.css";
import ReactSwitch from "react-switch";
import {MdDarkMode, MdLightMode} from "react-icons/md";
import {LinkContainer} from "react-router-bootstrap";

const get_dark_icon = () => {
    return (
        <MdDarkMode className={"icons"}/>
    )
}

const get_light_icon = () => {
    return (
        <MdLightMode className={"icons"}/>
    )
}

const MyNavbar = (props) => {
    return (
      <div>
        <Navbar className="bg-body-tertiary" data-bs-theme={props.current}>
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
                    <ReactSwitch className={"switch-button"} onChange={props.toggle} checked={props.current === "dark"} checkedIcon={get_dark_icon()} uncheckedIcon={get_light_icon()} onColor={"#888"}/>
                </Navbar.Collapse>
            </Container>
        </Navbar>
      </div>
    );
}

export default MyNavbar;