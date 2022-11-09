import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { beanListState } from "store/atom";
import "./App.scss";

import useBeanAPI from "components/hooks/useBeanAPI";
import Main from "components/Main/Main";
import Nav from "components/Nav/Nav";
import KakaoMap from "components/KakaoMap";
import Logo from "assets/img/Logo.svg";
import useGeolocation from "components/hooks/useGeolocation";

function App() {
  useBeanAPI();
  const { loaded } = useGeolocation();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="App">
      <div className="logo">
        <img src={Logo} alt="로고" onClick={() => navigate("/feedback")} />
      </div>
      <Nav />
      <Routes location={location}>
        <Route
          path="/*"
          element={
            <>
              {loaded && <KakaoMap />}
              <Main />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
