import "./App.css";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
import { Navbar, Container, Nav } from "react-bootstrap";
import { createContext, useState } from "react";
import data from "./data.js";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./routes/Detail.js";
import axios from "axios";

export let Context1 = createContext(); //context(state보관함)를 만들어줌

function App() {
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [count, setCount] = useState(0);
  let [재고] = useState([10, 11, 12]);
  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              Detail
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"></div>
              <div className="container">
                <div className="row">
                  {shoes.map((item, idx) => {
                    return <Card shoes={shoes[idx]} idx={idx} key={item.id} />;
                  })}
                </div>
              </div>
              <button
                onClick={() => {
                  <Loading />;
                  setCount(count + 1);
                  if (count == 1) {
                    axios
                      .get("https://codingapple1.github.io/shop/data2.json")
                      .then((result) => {
                        let temp = [...shoes, ...result.data];
                        setShoes(temp);
                      })
                      .catch(() => {
                        console.log("실패");
                      });
                  } else if (count == 2) {
                    axios
                      .get("https://codingapple1.github.io/shop/data3.json")
                      .then((result) => {
                        let temp = [...shoes, ...result.data];
                        setShoes(temp);
                      })
                      .catch(() => {
                        console.log("실패");
                      });
                  } else if (count >= 3) {
                    alert("더이상 상품이 없습니다");
                  }
                }}
              >
                더보기
              </button>
            </>
          }
        />
        <Route
          path="/detail/:id"
          element={
            <Context1.Provider value={{ 재고 }}>
              <Detail shoes={shoes} />
            </Context1.Provider>
          }
        />
        <Route path="*" element={<div>없는 페이지에요</div>} />{" "}
        {/* 이상한 페이지 접속했을 때 */}
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버임</div>} />
          <Route path="location" element={<div>위치정보임</div>} />
        </Route>
        <Route path="/event" element={<Event />}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
        </Route>
      </Routes>
    </div>
  );
}

function Loading() {
  return (
    <div>
      <h4>로딩중입니다...</h4>
      <h4>기다려주세요...</h4>
    </div>
  );
}

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사 정보임</h4>
      <Outlet></Outlet> {/*어디 보여줄지 보여주는 자리 */}
    </div>
  );
}

function Card({ shoes, idx }) {
  return (
    <div className="col-md-4">
      <img
        src={"https://codingapple1.github.io/shop/shoes" + (idx + 1) + ".jpg"}
        width="80%"
      />
      <h4>{shoes.title}</h4>
      <p>{shoes.price}</p>
    </div>
  );
}

export default App;
