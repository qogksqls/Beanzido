import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "./App.scss";

import useBeanAPI from "components/hooks/useBeanAPI";
import Main from "components/Main/Main";
import Nav from "components/Nav/Nav";
import Logo from "assets/img/Logo.svg";
import useGeolocation from "components/hooks/useGeolocation";

function App() {
  const { fetchBean } = useBeanAPI();
  const { loaded } = useGeolocation();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => fetchBean(), []);

  useEffect(() => {
    function setScreenSize() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
    setScreenSize();

    window.addEventListener("resize", setScreenSize);

    return () => window.removeEventListener("resize", setScreenSize);
  }, []);

  return (
    <div className="App">
      <div className="logo">
        <img src={Logo} alt="로고" onClick={() => navigate("/feedback")} />
      </div>
      <Nav />
      <Routes location={location}>
        <Route path="/*" element={<>{loaded && <Main />}</>} />
      </Routes>
    </div>
  );
}

export default App;
