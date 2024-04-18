import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import moment from "moment";

import logo from "../assets/logo.png";
import search from "../assets/search-solid.svg";
import bars from "../assets/bars-solid.svg";
import Avatar from "../components/Avatar/Avatar";

import "../components/Navbar.css";
import { setCurrentUser } from "../actions/currentUser";
import { updateTheme } from "../actions/theme";

function Navbar({ handleSlideIn }) {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.themeReducer);

  var User = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();
  const [isLogout, setIsLogout] = useState(false);
  const handleLogout = () => {
    setIsLogout(true);
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("Profile");
    localStorage.removeItem("userVerified");
    navigate("/");
    dispatch(setCurrentUser(null));
  };

  useEffect(() => {
    const token = User?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    if (!isLogout) {
      dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    }
    const currentTime = moment().format("HH:mm");
    const isDaytime = moment(currentTime, "HH:mm").isBetween(
      moment("06:00", "HH:mm"),
      moment("18:00", "HH:mm")
    );
    dispatch(updateTheme(isDaytime ? "light-theme" : "dark-theme"));
  });
  //[User?.token, dispatch]

  return (
    <nav className={`main-nav ${currentTheme.theme}`}>
      <div className="navbar">
        <button className="slide-in-icon" onClick={() => handleSlideIn()}>
          <img src={bars} alt="bars" width="15" />
        </button>
        <Link to="/" className="nav-item nav-logo">
          <img src={logo} alt="logo" />
        </Link>
        <Link to="/" className="nav-item nav-btn res-nav">
          About
        </Link>
        <Link to="/" className="nav-item nav-btn res-nav">
          Products
        </Link>
        <Link to="/" className="nav-item nav-btn res-nav">
          For Teams
        </Link>
        <form>
          <input type="text" placeholder="Search..." />
          <img src={search} alt="search" width={18} className="search-icon" />
        </form>
        {User === null ? (
          <Link to="/Auth" className="nav-item nav-links">
            {" "}
            Log in{" "}
          </Link>
        ) : (
          <>
            <Avatar
              backgroundColor={"#009dff"}
              px={"10px"}
              py={"7px"}
              borderRadius={"50%"}
              color={"white"}
              textDecorat
            >
              <Link to={`/Users/${User?.result?._id}`}>
                {User.result.name.charAt(0).toUpperCase()}
              </Link>
            </Avatar>
            <button className="nav-item nav-links" onClick={handleLogout}>
              Log out
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
