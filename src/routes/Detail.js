import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Nav } from "react-bootstrap";
import { Context1 } from "./../App.js";

// let YellowBtn = styled.button`
//   background: ${(props) => props.bg};
//   color: ${(props) => (props.bg == "blue" ? "white" : "black")};
//   padding: 10px;
// `;

// let Box = styled.div`
//   background: grey;
//   padding: 20px;
// `;

function Detail({ shoes }) {
  let { 재고 } = useContext(Context1); //보관함 해체 함수 ,object 형식

  let [count, setCount] = useState(0);
  let [input, setInput] = useState("");
  let [tab, setTab] = useState(0);
  let [fade2, setFade2] = useState("");

  useEffect(
    () => {
      // Detail component가 mount, update 될때 코드 실행됨
      // useEffect가 언제 쓰면 좋을지, 실행시점이 렌더링 다된후 실행
      // 복잡한 연산이나, 서버에서 데이터 가져오는 작업, 타이머 등등..
      setFade2("end");
      if (isNaN(input)) {
        alert("그러지 마세요");
      }
      return () => {
        setFade2("");
      };
    },
    [input],
    []
  ); //useEffect dependency넣어주면 변수가 변할때마다 실행된다.
  // useEffect안에 return 넣어주면 useEffect동작 전에 실행됨
  // 서버로 데이터 요청하는 도중에 재렌더링될 때 기존 요청이랑 충돌방지
  let { id } = useParams();
  //console.log(id);

  let findItem = shoes.find((data) => {
    return data.id == id;
  });
  // console.log(findItem);
  return (
    <div className={"container start " + fade2}>
      {alert ? (
        <div className="alert alert-warning">2초이내 구매시 할인</div>
      ) : null}
      {count}
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        버튼
      </button>
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <input
            placeholder="숫자 입력란"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <h4 className="pt-5">{findItem.title}</h4>
          <p>{findItem.content}</p>
          <p>{findItem.price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            eventKey="link0"
            onClick={() => {
              setTab(0);
            }}
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link1"
            onClick={() => {
              setTab(1);
            }}
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link2"
            onClick={() => {
              setTab(2);
            }}
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} />
    </div>
  );
}

function TabContent({ tab }) {
  // if (tab == 0) {
  //   return <div>내용0</div>;
  // } else if (tab == 1) {
  //   return <div>내용1</div>;
  // } else if (tab == 2) {
  //   return <div>내용2</div>;
  // }
  let { 재고 } = useContext(Context1);
  let [fade, setFade] = useState();
  useEffect(() => {
    let a = setTimeout(() => {
      setFade("end");
    }, 100);
    return () => {
      setFade("");
      clearTimeout(a);
    };
  }, [tab]);
  return (
    <div className={"start " + fade}>
      {[<div>내용0{재고[0]}</div>, <div>내용1</div>, <div>내용2</div>][tab]}
    </div>
  );
}

export default Detail;
