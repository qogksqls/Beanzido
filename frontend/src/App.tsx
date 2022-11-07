import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { beanListState } from "store/atom";
import "./App.scss";

import useBeanAPI from "components/hooks/useBeanAPI";
import useGeoLocation from "components/hooks/useGeolocation";
import Main from "components/Main/Main";
import Nav from "components/Nav/Nav";
import KakaoMap from "components/KakaoMap";
import Logo from "assets/img/Logo.svg";

function App() {
  useBeanAPI();
  const location = useLocation();
  const { loaded } = useGeoLocation();
  const navigate = useNavigate();

  return (
    <div className="App">
      {loaded && <KakaoMap />}
      <div className="logo">
        <img src={Logo} alt="로고" onClick={() => navigate("/feedback")} />
      </div>
      <Nav />
      <Routes location={location}>
        <Route path="/*" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
