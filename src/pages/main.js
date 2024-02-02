import React from 'react';
import "./main.css";
import {Row, Col, Container} from "react-bootstrap";
import profile from "../assets/myprofile.jpeg";

const typing_text_list = [
    "I'm Seolmango!",
    "I make what I want!",
    "I'm a member of 0-inf!"
];
let typing_text = typing_text_list[0];
let typing_text_list_index = 0;
let typing_text_index = 1;
let waitcount = 0;

function typing() {
    if(waitcount > 0){
        waitcount--;
        return;
    }
    if (typing_text_index < typing_text.length) {
        let text = typing_text.charAt(typing_text_index);
        const area = document.getElementById("typing");
        area.innerHTML += text;
        typing_text_index++;
        if(typing_text_index === typing_text.length){
            waitcount = 10;
        }
    }else{
        typing_text_list_index++;
        if(typing_text_list_index === typing_text_list.length){
            typing_text_list_index = 0;
        }
        typing_text = typing_text_list[typing_text_list_index];
        typing_text_index = 1;
        const area = document.getElementById("typing");
        area.innerHTML = typing_text.charAt(0);
    }
}

const typingInterval = setInterval(typing, 200);

const Main = (props) => {
    return (
      <Container>
          <Row>
              <Col sm={8}>
                  <div className={"hello-area"}>
                      <h1 className={"title"}>Hello!</h1>
                      <h1 className={"title inline"} id={"typing"}>I</h1>
                      <h1 className={"title inline blink"}>|</h1>
                  </div>
              </Col>
              <Col sm={4}>
                  <div className={'profile-area'}>
                      <div className={"profile-box"}>
                          <img
                              src={profile}
                              alt={"profile"}
                              className={"profile-image"}
                          />
                      </div>
                  </div>
              </Col>
          </Row>
      </Container>
    );
}

export default Main;