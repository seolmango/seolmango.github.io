import React from 'react';
import "./main.css";
import {Carousel} from "react-bootstrap";
import galsim_img from "../assets/projects_/galsim.jpg";
import kbwd_img from "../assets/projects_/KoreanBadwordDetection.webp";


const Projects = (props) => {
    return (
        <Carousel data-bs-theme={(props.current==="light") ? "dark" : "light"} fade>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={galsim_img}
                    alt="Galaxy Simulator"
                />
                <Carousel.Caption>
                    <h3>Galaxy Simulator</h3>
                    <p>Simulate the collision of two galaxies!</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={kbwd_img}
                    alt="Korean Badword Detection"
                />
                <Carousel.Caption>
                    <h3>Korean Badword Detection</h3>
                    <p>A Python module for detecting and filtering Korean swear words without using deep learning.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}
const Main = (props) => {
    return (
      <div>
          <div className={"container"}>
              <h1 className={"title"}>
                  Hello, World!
              </h1>
              <p>
                  I am a student interested in coding.
              </p>
              <p>
                  It's hard for me, and even if it's something I've never made before, I make it when I'm interested.
                  So I used Python, JavaScript, and C to create web games, simulations, tiny DBMSs.
              </p>
              <Projects current={props.current}/>
          </div>
      </div>
    );
}

export default Main;