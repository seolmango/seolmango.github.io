import React from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Pagination } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import "./projects.css";

// image
import galsim_title_image from "../assets/projects/galsim/title.webp";
import fileRenamer_title_image from "../assets/projects/fileRenamer/title.webp";
import switchio_title_image from "../assets/projects/switchio/title.webp";
import unusualChromeExtenstion from "../assets/projects/UnusualChromeExtension/title.webp";
import badworddetection from "../assets/projects/badwordDetection/title.webp";
import fibonacciBenfordLawCheck from "../assets/projects/fibonacciBenfordLawCheck/title.webp";

const page_data = [
  [
    {
      title: "Galaxy Simulation",
      img: galsim_title_image,
      text: "파이썬으로 만든 두 은하의 충돌을 시뮬레이션 할 수 있는 프로그램입니다.",
      link: "/projects/detail/galsim",
    },
    {
      title: "File Renamer",
      img: fileRenamer_title_image,
      text: "파이썬으로 만든 파일 이름을 정규식을 이용하여 일괄적으로 변경할 수 있도록 돕는 프로그램입니다.",
      link: "/projects/detail/fileRenamer",
    },
    {
      title: "Switchio",
      img: switchio_title_image,
      text: "Node.js와 Socket.io를 이용하여 만든 술래잡기 기반 웹 게임입니다.",
      link: "/projects/detail/switchio",
    },
  ],
  [
    {
      title: "Unusual Chrome Extension",
      img: unusualChromeExtenstion,
      text: "JavaScript를 이용하여 만든 약간 정신나간 (?) 크롬 확장 프로그램입니다.",
      link: "/projects/detail/unusualChromeExtension",
    },
    {
      title: "Badword Detection",
      img: badworddetection,
      text: "파이썬을 이용하여 만든 (발악한), 딥러닝을 사용하지 않고 만든 한국어 욕설 감지 프로그램입니다.",
      link: "/projects/detail/badwordDetection",
    },
    {
      title: "Fibonacci Benford Law Check",
      img: fibonacciBenfordLawCheck,
      text: "파이썬을 이용하여 만든 피보나치 수열에서의 벤포드의 법칙을 검사하는 프로그램입니다.",
      link: "/projects/detail/fibonacciBenfordLawCheck",
    },
  ],
];

const ProjectList = ({ page }) => {
  const active_page = Math.max(0, Math.min(page_data.length - 1, page));
  const card_items = [];
  for (let i = 0; i < page_data[active_page].length; i++) {
    card_items.push(
      <CardItem
        title={page_data[active_page][i].title}
        img={page_data[active_page][i].img}
        text={page_data[active_page][i].text}
        link={page_data[active_page][i].link}
        key={i}
      />
    );
  }
  const pagination_items = [];
  for (let i = 0; i < page_data.length; i++) {
    pagination_items.push(
      <React.Fragment key={i}>
        <LinkContainer to={"/projects/" + i}>
          <Pagination.Item key={i + 1} active={i === active_page}>
            {i + 1}
          </Pagination.Item>
        </LinkContainer>
      </React.Fragment>
    );
  }
  return (
    <div>
      <div className={"project-list"}>{card_items}</div>
      <div className={"project-pagination normal"}>
        <Pagination>{pagination_items}</Pagination>
      </div>
    </div>
  );
};

const CardItem = ({ img, title, text, link }) => {
  return (
    <Card className={"project-card-item"}>
      <Card.Img variant={"top"} src={img} />
      <Card.Body>
        <Card.Title className={"title"}>{title}</Card.Title>
        <Card.Text className={"normal"}>{text}</Card.Text>
        <LinkContainer to={link}>
          <Button variant={"info"}>
            <span className={"normal"}>View Detail</span>
          </Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};
const Projects = () => {
  let { page } = useParams();
  if (page === undefined || page === "") {
    return <Navigate to={"/projects/0"} />;
  } else if (isNaN(page)) {
    return <Navigate to={"/projects/0"} />;
  } else {
    page = parseInt(page);
  }
  return (
    <div>
      <ProjectList page={page} />
    </div>
  );
};

export default Projects;
