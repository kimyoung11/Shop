import { configureStore, createSlice } from "@reduxjs/toolkit";

//redux 쓰는 이유 : 컴포넌트간 state 공유가 편해진다. 직접 사용할수 있기때문에
//props 전송이 필요가없다.

let user = createSlice({
  //useState랑 비슷
  name: "user",
  initialState: "kim",

  //state 수정할때, step
  //1.state 수정해주는 함수만들기
  reducers: {
    changeName(state) {
      return "john " + state;
    },
  },
});

//2.만든 함수를 export 한다
export let { changeName } = user.actions;
//3. usedispatch 안에 함수를 감싸준다

let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
});

export default configureStore({
  reducer: {
    user: user.reducer,
    cart: cart.reducer,
  },
});
