import React from 'react';
import "./main.css";
import {Row, Col, Container} from "react-bootstrap";
import profile from "../assets/myprofile.webp";
import {MdEmail} from "react-icons/md";
import {FaInstagram, FaGithub} from "react-icons/fa";
import {TbBrandYoutube} from "react-icons/tb";
import {TypeAnimation} from "react-type-animation";

const Main = (props) => {
    return (
      <Container>
          <Row>
              <Col sm={8}>
                  <div className={"hello-area"}>
                      <h1 className={"title"}>Hello!</h1>
                      <TypeAnimation
                          sequence={[
                              "I'm Seolmango!",
                              2000,
                              "I make what I want!",
                              2000,
                              "I'm a member of 0-inf!",
                              2000
                          ]}
                          wrapper={"h1"}
                          repeat={Infinity}
                          className={"title"}
                          speed={50}
                      />
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
          <Row className={"des-con-con"}>
              <Col md={7} className={"description-area"}>
                  <h2 className={"title"}>About Me</h2>
                  <span className={"normal"}>안녕하세요. 코딩을 취미로 하고 있는 설망고입니다. </span>
                  <span className={"normal"}>저는 주로 Python이나 JavaScript를 이용하여 제가 만들고 싶은 것들을 만듭니다. </span>
                  <span className={"normal"}>언어를 먼저 공부하기보단 만들고 싶은 것을 만들면서 그때그때 필요한 내용을 공부하다보니, </span>
                  <span className={"normal"}>실력이 뛰어난 것은 아닙니다. 그러나 계속 시도하며 생긴 경험은 습득한 지식들이 더 오래 남게 만들었고, </span>
                  <span className={"normal"}>응용력을 길러 더 많은 실생활에 코딩을 적용할 수 있게 만들어주었습니다.</span>
                  <br/>
                  <span className={"normal"}>디스코드 봇을 만들고 싶어 Python을 공부했고, 웹 게임을 만들고 싶어 JavaScript를 공부했습니다. </span>
                  <span className={"normal"}>그리고 그것들을 만들면서 필요한 지식들을 습득하며, 더 많은 것들을 만들수 있었습니다. </span>
                  <span className={"normal"}>현재는, 저와 같이 취미로 코딩을 하는 사람들이 모여 0-inf라는 팀을 이루고 활동하고 있습니다. </span>
              </Col>
              <Col md={4} className={"contact-area"}>
                  <h2 className={"title"}>Contact</h2>
                  <div className={"contact-items"}>
                      <div onClick={function () {
                          window.open("mailto:seolchaehwan70@gmail.com");
                      }}>
                          <b><span className={"normal"}><MdEmail/>Email</span></b>
                          <br/>
                          <span className={"normal"}>seolchaehwan70@gmail.com</span>
                      </div>
                      <div onClick={function () {
                          window.open("https://www.instagram.com/seolmango/");
                      }}>
                          <b><span className={"normal"}><FaInstagram/>Instagram</span></b>
                          <br/>
                          <span className={"normal"}>seolmango</span>
                      </div>
                      <div onClick={function () {
                          window.open("https://github.com/seolmango");
                      }}>
                          <b><span className={"normal"}><FaGithub/>Github</span></b>
                          <br/>
                          <span className={"normal"}>seolmango</span>
                      </div>
                      <div onClick={function () {
                          window.open("https://youtube.com/@zerotoinf?si=lW00UmppmJLUmVeo");
                      }}>
                          <b><span className={"normal"}><TbBrandYoutube/>Youtube</span></b>
                          <br/>
                          <span className={"normal"}>0-inf</span>
                      </div>
                  </div>
              </Col>
          </Row>
      </Container>
    );
}

export default Main;