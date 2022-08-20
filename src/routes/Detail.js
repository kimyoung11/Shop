import { useParams } from "react-router-dom";

function Detail({ shoes }) {
  let { id } = useParams();
  //console.log(id);

  let findItem = shoes.find((data) => {
    return data.id == id;
  });
  console.log(findItem);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{findItem.title}</h4>
          <p>{findItem.content}</p>
          <p>{findItem.price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}
export default Detail;
